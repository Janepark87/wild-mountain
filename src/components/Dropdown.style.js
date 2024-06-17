import styled from 'styled-components';

export const Inner = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const StyledTrigger = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	min-width: 3rem;
	height: 3rem;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		padding: 0.25rem;
		font-size: 2.5rem;
		color: var(--color-grey-700);
	}
`;

export const StyledList = styled.ul`
	position: absolute;
	top: 2rem;
	right: 2rem;
	min-width: max-content;
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);
	z-index: 1000;
`;

export const StyledItem = styled.button`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	width: 100%;
	padding: 1.2rem 2.4rem;
	text-align: left;
	background: none;
	border: none;
	font-size: 1.4rem;
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;
