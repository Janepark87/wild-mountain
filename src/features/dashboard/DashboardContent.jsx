import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from '../../hooks/useDashboard';
import Spinner from '../../components/Spinner';

const StyledDashboardContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardContent() {
	const { bookings, isBookingsLoading } = useRecentBookings();
	const { stays, confirmedStays, isStaysLoading } = useRecentStays();

	if (isBookingsLoading || isStaysLoading) return <Spinner />;

	return <StyledDashboardContent>Content</StyledDashboardContent>;
}
