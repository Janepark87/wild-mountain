import { useState } from 'react';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLogin } from '../../hooks/useAuth';
import Spinner from '../../components/Spinner';

export default function LoginForm() {
	const [email, setEmail] = useState('web.jpark@gmail.com');
	const [password, setPassword] = useState('green2024');
	const { loginMutate, isLoginLoading } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) return;
		loginMutate({ email, password });
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
					{!isLoginLoading ? (
						'Log in'
					) : (
						<em>
							Loding...
							<Spinner size="mini" />
						</em>
					)}
				</Button>
			</FormRow>
		</Form>
	);
}
