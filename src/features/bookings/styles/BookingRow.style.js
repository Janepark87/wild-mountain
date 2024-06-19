import styled from 'styled-components';

export const Cabin = styled.div`
	color: var(--color-grey-600);
	font-family: 'Sono';
	font-size: 1.6rem;
	font-weight: 600;
`;

export const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

export const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;
