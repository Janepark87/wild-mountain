import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useAuth';
import { Spinner } from '../components';
import { LoginLayout } from './';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isUserLoading, isAuthenticated } = useUser();

	useEffect(() => {
		if (!isAuthenticated && !isUserLoading) navigate('/login');
	}, [isAuthenticated, isUserLoading, navigate]);

	if (isUserLoading)
		return (
			<LoginLayout>
				<Spinner />;
			</LoginLayout>
		);

	if (isAuthenticated) return children;
}
