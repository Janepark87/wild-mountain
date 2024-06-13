import styled from 'styled-components';

export const Img = styled.img`
	width: 100%;
	max-width: 7rem;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: var(--border-radius-sm);
`;

export const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

export const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

export const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;
