import styled from 'styled-components';
import { useCabinQuery } from '../../hooks/useCabin';
import { useRecentBookings, useRecentStays } from '../../hooks/useDashboard';
import { Spinner } from '../../components';
import { Statistics, SalesChart, DurationChart } from './index';
import { TodayCheckInOutActivity } from '../check-in-out';

const StyledDashboardContent = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardContent() {
	const { bookings, isBookingsLoading } = useRecentBookings();
	const { confirmedStays, numDays, isStaysLoading } = useRecentStays();
	const { cabins, isCabinsLoading } = useCabinQuery();

	if (isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

	return (
		<StyledDashboardContent>
			<Statistics bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} totalCabins={cabins.length} />
			<TodayCheckInOutActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardContent>
	);
}
