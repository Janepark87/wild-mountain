import styled from 'styled-components';
import { Media } from '../styles/Breakpoints';
import DarkModeToggle from './DarkModeToggle';
import Logout from '../features/Authentication/Logout';
import UserAvatar from '../features/Authentication/UserAvatar';

const StyledHeaderMenu = styled.ul`
	display: flex;
	align-items: center;

	> li > button {
		padding: 1rem 1.25rem;
		line-height: 0;

		${Media.sm`
            > span{
                display: none;
            }
        `}
	}
`;

export default function HeaderMenu() {
	return (
		<StyledHeaderMenu>
			<li>
				<UserAvatar />
			</li>
			<li>
				<DarkModeToggle />
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
}
