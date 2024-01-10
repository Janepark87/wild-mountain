import { useBookingQuery } from '../../hooks/useBooking';
import Table from '../../components/Table';
import BookingRow from './BookingRow';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

export default function BookingTable() {
	const { bookings, isBookingLoading, count } = useBookingQuery();

	if (isBookingLoading) return <Spinner />;

	return (
		<Table columns="0.6fr 2.5fr repeat(4, 1.5fr) 1.25fr 3.2rem">
			<Table.Header>
				<span>Cabin</span>
				<span>Guest</span>
				<span>Check in</span>
				<span>Check out</span>
				<span>Details</span>
				<span>Status</span>
				<span>Amount</span>
				<span></span>
			</Table.Header>

			<Table.Body data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />

			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Table>
	);
}
