import styled from 'styled-components';
import Logo from '../components/Logo';
import Heading from '../components/Heading';
import LoginForm from '../features/Authentication/LoginForm';

const LoginLayout = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: var(--color-grey-50);
`;

const InnerWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 48rem;
	gap: 3.2rem;
`;

export default function Login() {
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
