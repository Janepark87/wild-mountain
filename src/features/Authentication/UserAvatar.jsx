import styled from 'styled-components';
import { Media } from '../../styles/Breakpoints';
import { useUser } from '../../hooks/useAuth';

const StyledUserAvatar = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;
	color: var(--color-grey-600);
	font-size: 1.4rem;
	font-weight: 500;
`;

const Avatar = styled.img`
	display: block;
	max-width: 2.5rem;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 50%;
	outline: 1px solid var(--color-grey-50);

	${Media.sm`
        display: none;
    `}
`;

export default function UserAvatar() {
	const {
		user: {
			user_metadata: { fullname, avatar },
		},
	} = useUser();

	return (
		<StyledUserAvatar>
			<Avatar src={avatar || 'default-user.jpg'} alt={`Avatar of ${fullname}`} />
			<span>{fullname}</span>
		</StyledUserAvatar>
	);
}
