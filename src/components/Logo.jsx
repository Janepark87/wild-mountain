import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	width: auto;
	height: 9.6rem;
	object-fit: cover;
`;

const StyledSpan = styled.span`
	display: block;
	font-size: 1.6rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export default function Logo() {
	return (
		<StyledLogo as={Link} to="/">
			<Img src="logo.png" alt="Logo" />
			<StyledSpan>The Nature Oasis</StyledSpan>
		</StyledLogo>
	);
}
