import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar, Header } from '../components';
import { Media } from '../styles/Breakpoints';
import { useAppNavigation } from '../context/NavigationContext';
import SidebarOverlay from '../components/SidebarOverlay';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;

	${Media.sm`
		grid-template-columns: 1fr;

		&.toggle-on {
			aside {
				left: 0;
			}
		}
	`}
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow-y: auto;

	${Media.sm`
		padding: 4rem 3rem;
	`}
`;

export default function AppLayout() {
	const { menuToggle } = useAppNavigation();

	return (
		<StyledAppLayout className={`${menuToggle ? 'toggle-on' : ''}`}>
			<Header />
			<Sidebar />

			<Main>
				<Outlet />
			</Main>

			<SidebarOverlay />
		</StyledAppLayout>
	);
}
