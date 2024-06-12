import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar, Header } from '../components';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow-y: auto;
`;

export default function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />

			<Main>
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
}
