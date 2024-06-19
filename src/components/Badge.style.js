import styled from 'styled-components';

const Badge = styled.span`
	width: fit-content;
	padding: 0.4rem 1.2rem;
	border-radius: 100px;
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	white-space: nowrap;

	/* Make these dynamic, based on the received prop */
	color: var(--color-${(props) => props.$variant}-700);
	background-color: var(--color-${(props) => props.$variant}-100);
`;

export default Badge;
