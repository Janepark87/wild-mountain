import styled from 'styled-components';
import { Uploader } from '../data/Uploader.jsx';
import { DarkModeToggle, Logo, Navbar } from './';
import { Media } from '../styles/Breakpoints';
import Logout from '../features/authentication/Logout.jsx';

const StyledSidebar = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	grid-row: 1 / -1;
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);
	overflow-y: auto;

	${Media.sm`
		position: fixed;
		top: 0;
		left: -100%;
		width: 100%;
		max-width: 26rem;
		height: 100%;
		transition: left .5s ease-in-out;
		box-shadow: var(--shadow-lg);
		z-index: 1001;
		
	`}
`;

const StyledOptionsBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: auto;
`;

const StyledMobileOptions = styled.div`
	display: none;
	flex-direction: column;

	${Media.sm`
		display: flex;
		
	`}
`;

export default function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<Navbar />

			<StyledOptionsBlock>
				<StyledMobileOptions>
					<DarkModeToggle mobile={true} />
					<Logout mobile={true} />
				</StyledMobileOptions>

				{import.meta.env.DEV && <Uploader />}
			</StyledOptionsBlock>
		</StyledSidebar>
	);
}
