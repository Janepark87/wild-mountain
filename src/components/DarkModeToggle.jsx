import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useDarkMode } from '../context/DarkModeContext';
import { Button } from './';
import styled from 'styled-components';

const StyledMobileDarkMode = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	color: var(--color-grey-600);
	font-size: 1.6rem;
	font-weight: 500;
	padding: 1.2rem 2.4rem;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		color: var(--color-grey-800);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg {
		color: var(--color-yellow-700);
	}
`;

export default function DarkModeToggle({ mobile = false }) {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	if (mobile)
		return (
			<StyledMobileDarkMode to="dashboard" onClick={toggleDarkMode}>
				{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
				<span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
			</StyledMobileDarkMode>
		);

	return (
		<Button size="icon-sm" variation="ghost" onClick={toggleDarkMode}>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</Button>
	);
}
