import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../hooks/useAuth';
import Logo from '../components/Logo';
import Heading from '../components/Heading';
import LoginForm from '../features/Authentication/LoginForm';
import LoginLayout from '../layouts/LoginLayout';
import Spinner from '../components/Spinner';

const InnerWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 48rem;
	gap: 3.2rem;
`;

export default function Login() {
	const navigate = useNavigate();
	const { isUserLoading, isAuthenticated } = useUser();

	useEffect(() => {
		if (isAuthenticated && !isUserLoading) navigate('/');
	}, [isAuthenticated, isUserLoading, navigate]);

	if (isUserLoading)
		return (
			<LoginLayout>
				<Spinner />;
			</LoginLayout>
		);

	return (
		<LoginLayout>
			<InnerWrap>
				<Logo />
				<Heading as="h1" className="text-center">
					Log in to your account
				</Heading>
				<LoginForm />
			</InnerWrap>
		</LoginLayout>
	);
}
