import styled from 'styled-components';

export const StyledTodayActivityItem = styled.li`
	display: grid;
	grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
	gap: 1.2rem;
	align-items: center;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);
	font-size: 1.4rem;

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`;

export const Guest = styled.div`
	font-weight: 500;
`;
