import styled from 'styled-components';
import { Uploader } from '../data/Uploader.jsx';
import { Logo, Navbar } from './index.js';

const StyledSidebar = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	grid-row: 1 / -1;
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);
	overflow-y: auto;
`;

export default function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<Navbar />

			{import.meta.env.DEV && <Uploader />}
		</StyledSidebar>
	);
}
