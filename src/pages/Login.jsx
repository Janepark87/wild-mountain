import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../hooks/useAuth';
import { LoginLayout } from '../layouts';
import { LoginForm } from '../features/authentication';
import { Heading, Logo, Spinner } from '../components';

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
