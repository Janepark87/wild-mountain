import styled from 'styled-components';

export const StyledToday = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding: 2.4rem 3.2rem 3.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

export const TodayActiveList = styled.ul`
	overflow: auto;
	overflow-x: hidden;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		width: 0 !important;
	}

	scrollbar-width: none;
	-ms-overflow-style: none;
`;

export const NoActivity = styled.p`
	margin-top: 0.8rem;
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
`;
