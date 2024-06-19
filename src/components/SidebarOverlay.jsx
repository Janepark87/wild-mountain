import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { Media } from '../styles/Breakpoints';
import { useAppNavigation } from '../context/NavigationContext';
import { Button } from './';

const StyledSidebarOveray = styled.div`
	&,
	> button {
		display: none;
		position: fixed;
		transition: opacity 0.3s ease-in 0.2s;
		z-index: -1;
	}

	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(3px);

	> button {
		top: 1rem;
		right: 2rem;
		font-size: 2.5rem;

		&:hover {
			background-color: transparent;
		}
	}

	${Media.sm`
		&, > button{
			display: block;
		}

		opacity: 0;

		.toggle-on & {
			opacity: 1;
			z-index: 1000;

			> button{
				z-index: 1001;
			}
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
