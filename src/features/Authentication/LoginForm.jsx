import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Form, FormRow, Input, Button, Spinner } from '../../components';

export default function LoginForm() {
	const [email, setEmail] = useState(import.meta.env.VITE_LOGIN_EMAIL);
	const [password, setPassword] = useState(import.meta.env.VITE_LOGIN_PW);
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
				<Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoginLoading} />
			</FormRow>
			<FormRow orientation="vertical">
				<Button size="lg" disabled={isLoginLoading}>
					Log in {isLoginLoading && <Spinner size="mini" />}
				</Button>
			</FormRow>
		</Form>
	);
}
