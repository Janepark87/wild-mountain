import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import Button from '../../components/Button';
import { useLogout } from '../../hooks/useAuth';
import Spinner from '../../components/Spinner';

export default function Logout() {
	const { userLogoutMutate, isLogoutLoading } = useLogout();

	return (
		<Button size="lg" variation="ghost" onClick={userLogoutMutate} disabled={isLogoutLoading}>
			Logout {!isLogoutLoading ? <HiArrowRightOnRectangle /> : <Spinner size="mini" />}
		</Button>
	);
}
