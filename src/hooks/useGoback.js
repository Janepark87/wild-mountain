import { useNavigate } from 'react-router-dom';

export function useGoback() {
	const navigate = useNavigate();

	return () => navigate(-1);
}
