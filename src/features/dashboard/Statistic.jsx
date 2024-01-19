import styled from 'styled-components';

const StyledStatistic = styled.div`
	display: grid;
	grid-template-columns: 6rem 1fr;
	grid-template-rows: auto auto;
	column-gap: 1.8rem;
	row-gap: 0.4rem;
	padding: 1.6rem 2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

const Icon = styled.div`
	grid-row: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;
	border-radius: 50%;

	background-color: var(--color-${(props) => props.color}-100);

	& svg {
		width: 3rem;
		height: 3rem;
		color: var(--color-${(props) => props.color}-700);
	}
`;

const Title = styled.h5`
	align-self: end;
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--color-grey-500);
`;

const Value = styled.p`
	font-size: 2.4rem;
	font-weight: 500;
	line-height: 1;
`;

export default function Statistic({ icon, title, value, color }) {
	return (
		<StyledStatistic>
			<Icon color={color}>{icon}</Icon>
			<Title>{title}</Title>
			<Value>{value}</Value>
		</StyledStatistic>
	);
}
