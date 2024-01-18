import styled from 'styled-components';

const StyledStatistic = styled.div`
	display: grid;
	grid-template-columns: 6.4rem 1fr;
	grid-template-rows: auto auto;
	column-gap: 1.6rem;
	row-gap: 0.4rem;
	padding: 1.6rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

const Icon = styled.div`
	grid-row: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	aspect-ratio: 1;

	/* Make these dynamic, based on the received prop */
	background-color: var(--color-${(props) => props.color}-100);

	& svg {
		width: 3.2rem;
		height: 3.2rem;
		color: var(--color-${(props) => props.color}-700);
	}
`;

const Title = styled.h5`
	align-self: end;
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-500);
`;

const Value = styled.p`
	font-size: 2.4rem;
	line-height: 1;
	font-weight: 500;
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
