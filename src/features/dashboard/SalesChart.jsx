import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useDarkMode } from '../../context/DarkModeContext';
import { lineChartColorScheme } from '../../styles/chartColorScheme';
import { Heading } from '../../components';

const DashboardBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	padding: 3.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

export default function SalesChart({ bookings, numDays }) {
	const { isDarkMode } = useDarkMode();
	const { totalSales, extrasSales, text } = lineChartColorScheme(isDarkMode);

	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		const filterSameDay = bookings.filter((booking) => isSameDay(date, new Date(booking.created_at)));
		const totalSales = filterSameDay.reduce((acc, cur) => acc + cur.totalPrice, 0);
		const extrasSales = filterSameDay.reduce((acc, cur) => acc + cur.extrasPrice, 0);

		return {
			label: format(date, 'MMM dd'),
			totalSales,
			extrasSales,
		};
	});

	const generateLinearGradient = (id, color) => {
		return (
			<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
				<stop offset="2%" stopColor={color.stroke} stopOpacity={0.8} />
				<stop offset="98%" stopColor={color.stroke} stopOpacity={0} />
			</linearGradient>
		);
	};

	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1), 'MMM dd yyyy')}
			</Heading>
			<ResponsiveContainer width="100%" height={350}>
				<AreaChart data={data}>
					<defs>
						{generateLinearGradient('colorTotalSales', totalSales)}
						{generateLinearGradient('colorExtrasSales', extrasSales)}
					</defs>
					<XAxis dataKey="label" tick={{ fill: text }} tickLine={{ stroke: text }} />
					<YAxis unit="$" tick={{ fill: text }} tickLine={{ stroke: text }} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip contentStyle={{ backgroundColor: 'var(--color-grey-0)', borderRadius: '5px', borderColor: 'var(--color-grey-200)' }} />
					<Area dataKey="totalSales" name="Total sales" unit="$" type="monotone" fillOpacity={1} strokeWidth={1} stroke={totalSales.stroke} fill="url(#colorTotalSales)" />
					<Area dataKey="extrasSales" name="Extras Sales" unit="$" type="monotone" fillOpacity={1} strokeWidth={1.15} stroke={extrasSales.stroke} fill="url(#colorExtrasSales)" />
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}
