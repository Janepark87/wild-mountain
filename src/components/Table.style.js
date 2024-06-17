import styled from 'styled-components';

export const StyledTable = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: 7px;
	font-size: 1.4rem;
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2rem;
	align-items: center;
	transition: none;
`;

export const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;
	color: var(--color-grey-600);
	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	border-radius: inherit;
`;

export const StyledBody = styled.section`
	margin: 0;
`;

export const StyledRow = styled(CommonRow)`
	padding: 1.3rem 2rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

export const Footer = styled.footer`
	display: flex;
	justify-content: center;
	padding: 1.2rem;
	background-color: var(--color-grey-50);
	border-radius: inherit;

	&:not(:has(*)) {
		display: none;
	}
`;

export const Empty = styled.p`
	margin: 2.4rem;
	text-align: center;
	font-size: 1.6rem;
	font-weight: 500;
`;
