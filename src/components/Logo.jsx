import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	width: 100%;
	max-width: 13.5rem;
	object-fit: cover;
`;

const StyledSpan = styled.span`
	display: block;
	font-size: 1.6rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export default function Logo() {
	const { isDarkMode } = useDarkMode();

	return (
		<StyledLogo as={Link} to="/">
			<Img src={`${import.meta.env.DEV ? '/' : ''}logo-${isDarkMode ? 'light' : 'dark'}.svg`} alt="Logo" />
			<StyledSpan>Wild Mountain</StyledSpan>
		</StyledLogo>
	);
}
