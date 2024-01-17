import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCurrentUser, login, logout, signup, updateCurrentUser } from '../services/apiAuth';

export function useSingup() {
	const navigate = useNavigate();

	const { mutate: signupMutate, isPending: isSignupLoading } = useMutation({
		mutationFn: ({ fullname, email, password }) => signup({ fullname, email, password }),
		onSuccess: () => {
			toast.success("Account successfully created! Please verify the new account from the user's email address.");
			navigate('/login', { replace: true });
		},
		onError: (err) => {
			console.log(err.message);
			toast.success('You are unable to create an account at the moment!');
		},
	});

	return { signupMutate, isSignupLoading };
}

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: loginMutate, isPending: isLoginLoading } = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),
		onSuccess: (user) => {
			// retrieve the user from the cache to avoid unnecessary data fetching
			queryClient.setQueryData(['user'], user.user);
			toast.success('You have Succesfully logged in!');
			navigate('/dashboard', { replace: true });
		},
		onError: (err) => {
			console.log(err.message);
			toast.error('Provided email or password are incorrect');
		},
	});

	return { loginMutate, isLoginLoading };
}

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: userLogoutMutate, isPending: isLogoutLoading } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			// clear the user cache, which is set with query data upon user login
			queryClient.removeQueries();
			toast.success('You have Succesfully logged out!');
			navigate('/login', { replace: true });
		},
		onError: (err) => {
			console.log(err.message);
			toast.error('You are unable to log out');
		},
	});

	return { userLogoutMutate, isLogoutLoading };
}

export function useUser() {
	const { data: user, isPending: isUserLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return { user, isUserLoading, isAuthenticated: user?.role === 'authenticated' };
}

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUserMutate, isPending: isUserUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success('User account successfully updated.');
			queryClient.setQueryData(['user'], user);
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateUserMutate, isUserUpdating };
}
