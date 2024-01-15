import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCurrentUser, login } from '../services/apiAuth';

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: loginMutate, isPending: isLoginLoading } = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),
		onSuccess: (user) => {
			// retrieve the user from the cache to avoid unnecessary data fetching
			queryClient.setQueriesData(['user'], user.user);
			navigate('/dashboard');
			toast.success('You have Succesfully logged in!');
		},
		onError: (err) => {
			console.log(err);
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
