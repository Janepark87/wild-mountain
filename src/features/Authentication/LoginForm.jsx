import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

export default function LoginForm() {
	const [email, setEmail] = useState('web.jpark@gmail.com');
	const [password, setPassword] = useState('green2024');
	const { loginMutate, isLoginLoading } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) return;
		loginMutate(
			{ email, password },
			{
				onError: () => {
					setEmail('');
					setPassword('');
				},
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email" orientation="vertical">
				<Input type="email" id="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoginLoading} />
			</FormRow>
			<FormRow label="Password" orientation="vertical">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoginLoading}
				/>
			</FormRow>
			<FormRow orientation="vertical">
				<Button size="lg" disabled={isLoginLoading}>
					Log in {isLoginLoading && <Spinner size="mini" />}
				</Button>
			</FormRow>
		</Form>
	);
}
