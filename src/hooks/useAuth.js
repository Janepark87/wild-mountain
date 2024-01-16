import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCurrentUser, login, logout } from '../services/apiAuth';

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: loginMutate, isPending: isLoginLoading } = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),
		onSuccess: (user) => {
			// retrieve the user from the cache to avoid unnecessary data fetching
			queryClient.setQueryData(['user'], user.user);
			navigate('/dashboard', { replace: true });
			toast.success('You have Succesfully logged in!');
		},
		onError: (err) => {
			console.log(err.message);
			toast.error('Provided email or password are incorrect');
		},
	});

	return { loginMutate, isLoginLoading };
}

export function useUser() {
	const { data: user, isPending: isUserLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return { user, isUserLoading, isAuthenticated: user?.role === 'authenticated' };
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
