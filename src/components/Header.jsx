import { LuBarChart2 } from 'react-icons/lu';
import { UserAvatar, Logout } from '../features/authentication';
import { useAppNavigation } from '../context/NavigationContext';
import { Button, DarkModeToggle, Logo } from './index';
import { StyledHeader, StyledHeaderMenu, StyledMobileLogo, StyledMobileWrapper } from './Header.style';

export default function Header() {
	const { openNav } = useAppNavigation();

	return (
		<StyledHeader>
			<StyledMobileWrapper>
				<Button id="hamburger" size="icon-md" variation="ghost-secondary" onClick={() => openNav()}>
					<LuBarChart2 />
				</Button>

				<StyledMobileLogo>
					<Logo />
				</StyledMobileLogo>
			</StyledMobileWrapper>

			<StyledHeaderMenu>
				<li>
					<UserAvatar />
				</li>
				<li className="hidden-sm">
					<DarkModeToggle />
				</li>
				<li className="hidden-sm">
					<Logout />
				</li>
			</StyledHeaderMenu>
		</StyledHeader>
	);
}
