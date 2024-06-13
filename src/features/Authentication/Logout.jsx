import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { Button, Spinner } from '../../components';
import { useLogout } from '../../hooks/useAuth';

export default function Logout() {
	const { userLogoutMutate, isLogoutLoading } = useLogout();

	return (
		<Button size="lg" variation="ghost" onClick={userLogoutMutate} disabled={isLogoutLoading}>
			<span>Logout</span> {!isLogoutLoading ? <HiArrowRightOnRectangle /> : <Spinner size="mini" />}
		</Button>
	);
}
