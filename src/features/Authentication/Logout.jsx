import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { Button, Spinner } from '../../components';
import { useLogout } from '../../hooks/useAuth';
import styled from 'styled-components';

const StyledMobileLogout = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--color-grey-600);
	font-size: 1.6rem;
	font-weight: 500;
	padding: 1.2rem 2.4rem;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		color: var(--color-grey-800);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg {
		color: var(--color-red-700);
	}
`;

export default function Logout({ mobile = false }) {
	const { userLogoutMutate, isLogoutLoading } = useLogout();

	if (mobile)
		return (
			<StyledMobileLogout to="dashboard" onClick={userLogoutMutate}>
				<HiArrowRightOnRectangle />
				<span>Logout</span>
			</StyledMobileLogout>
		);

	return (
		<Button size="lg" variation="ghost" onClick={userLogoutMutate} disabled={isLogoutLoading}>
			<span>Logout</span> {!isLogoutLoading ? <HiArrowRightOnRectangle /> : <Spinner type="mini" />}
		</Button>
	);
}
