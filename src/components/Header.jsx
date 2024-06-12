import styled from 'styled-components';
import { Media } from '../styles/Breakpoints';
import { UserAvatar, Logout } from '../features/Authentication';
import { DarkModeToggle } from './index';

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem 1.25rem;
	background-color: var(--color-grey-0);
	border-bottom: 1px solid var(--color-grey-100);
`;

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

export default function Header() {
	return (
		<StyledHeader>
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
		</StyledHeader>
	);
}
