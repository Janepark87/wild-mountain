import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Heading, Button } from '../components';

const StyledErrorFallback = styled.main`
	width: 100%;
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3rem;
	flex: 0 1 96rem;
	max-width: 55rem;
	padding: 4.8rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	& p {
		max-width: 28rem;
		text-align: center;
		color: var(--color-grey-500);
		font-family: 'Sono';
	}

	& button {
		margin-top: 1.6rem;
	}
`;

export default function PageNotFound() {
	const navigate = useNavigate();

	return (
		<StyledErrorFallback>
			<Box>
				<Heading as="h1">404 - Oops!</Heading>
				<p>We could not find the page you were looking for 🧐</p>
				<Button size="md" onClick={() => navigate('/')}>
					Back to Dashboard
				</Button>
			</Box>
		</StyledErrorFallback>
	);
}
