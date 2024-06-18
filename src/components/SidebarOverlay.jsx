import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { Media } from '../styles/Breakpoints';
import { useAppNavigation } from '../context/NavigationContext';
import { Button } from './index';

const StyledSidebarOveray = styled.div`
	display: none;

	> button {
		position: fixed;
		top: 1rem;
		right: 2rem;
		font-size: 2.5rem;
		z-index: 1001;

		&:hover {
			background-color: transparent;
		}
	}

	${Media.sm`
		display: block;
		opacity: 0;

		.toggle-on & {
			opacity: 1;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(255, 255, 255, 0.1);
			backdrop-filter: blur(3px);	
			transition: opacity 0.3s ease-in .2s;			
			z-index: 1000;
		}
	`}
`;

export default function SidebarOverlay() {
	const { closeNav } = useAppNavigation();

	return (
		<StyledSidebarOveray onClick={closeNav}>
			<Button size="icon-md" variation="ghost-secondary" onClick={closeNav}>
				<RiCloseLine />
			</Button>
		</StyledSidebarOveray>
	);
}
