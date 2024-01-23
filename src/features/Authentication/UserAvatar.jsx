import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Media } from '../../styles/Breakpoints';
import { useUser } from '../../hooks/useAuth';

const StyledUserAvatar = styled.div`
	display: flex;
	padding: 0 1.25rem;
	color: var(--color-grey-600);
	align-items: center;
	font-size: 1.4rem;
	font-weight: 500;
	cursor: pointer;

	> span {
		margin-left: 1.25rem;

		${Media.sm`
			display: none;		
		`}
	}
`;

const Avatar = styled.img`
	display: block;
	max-width: 2.5rem;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 50%;
	outline: 1px solid var(--color-grey-50);
`;

export default function UserAvatar() {
	const navigate = useNavigate();
	const {
		user: {
			user_metadata: { fullname, avatar },
		},
	} = useUser();

	return (
		<StyledUserAvatar onClick={() => navigate('/account')}>
			<Avatar src={avatar || 'default-user.jpg'} alt={`Avatar${fullname ? ` of ${fullname}` : ''}`} />
			{fullname && <span>{fullname}</span>}
		</StyledUserAvatar>
	);
}
