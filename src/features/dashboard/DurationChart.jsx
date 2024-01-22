import styled from 'styled-components';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { pieChartStartDataLight, pieChartStartDataDark } from '../../styles/chartColorScheme';
import Heading from '../../components/Heading';

const ChartBox = styled.div`
	grid-column: 3 / span 2;
	padding: 2.4rem 3.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}

	& .recharts-tooltip-item-list * {
		color: var(--color-grey-700);
	}
`;

function prepareData(startData, stays) {
	const checkIsInRange = (from, to, number) => from <= number && to >= number;

	const updateReservations = (startDataArr, nights) => {
		return startDataArr?.map((obj) => {
			const { from, to } = obj.duration;
			const isInRange = checkIsInRange(from, to, nights);
			return isInRange ? { ...obj, reservations: obj.reservations + 1 } : obj;
		});
	};

	const data = stays.reduce((arr, cur) => updateReservations(arr, cur.numNights), startData).filter((obj) => obj.reservations > 0);

	return data;
}

export default function DurationChart({ confirmedStays }) {
	const { isDarkMode } = useDarkMode();
	const startData = isDarkMode ? pieChartStartDataDark : pieChartStartDataLight;
	const data = prepareData(startData, confirmedStays);

	return (
		<ChartBox>
			<Heading as="h2">Stay duration summary</Heading>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie data={data} nameKey="durationLabel" dataKey="reservations" innerRadius={80} outerRadius={110} cx="40%" cy="50%" paddingAngle={4}>
						{data.map((entry) => (
							<Cell key={entry.durationLabel} fill={entry.color} stroke={entry.color} />
						))}
					</Pie>
					<Tooltip contentStyle={{ backgroundColor: 'var(--color-grey-0)', borderRadius: '5px', borderColor: 'var(--color-grey-200)' }} />
					<Legend verticalAlign="middle" align="right" layout="vertical" width="30%" iconSize={15} iconType="circle" />
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}
