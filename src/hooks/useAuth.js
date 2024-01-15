import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../services/apiAuth';

export function useLogin() {
	const navigate = useNavigate();

	const { mutate: loginMutate, isPending: isLoginLoading } = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),
		onSuccess: () => {
			toast.success('You have Succesfully logged in!');
			navigate('/dashboard');
		},
		onError: (err) => {
			console.log(err);
			toast.error('Provided email or password are incorrect');
		},
	});

	return { loginMutate, isLoginLoading };
}
