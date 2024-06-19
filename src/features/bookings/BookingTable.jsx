import { useBookings } from '../../hooks/useBooking';
import { Dropdown, Table, Spinner, Pagination } from '../../components';
import { BookingRow } from './';

export default function BookingTable() {
	const { bookings, isBookingLoading, count } = useBookings();

	if (isBookingLoading) return <Spinner />;

	return (
		<Dropdown>
			<Table columns="0.6fr 2.5fr repeat(3, 1.5fr) repeat(2, 2fr) repeat(2, 1fr)">
				<Table.Header>
					<span>Cabin</span>
					<span>Guest</span>
					<span>Check in</span>
					<span>Check out</span>
					<span>Details</span>
					<span>Status</span>
					<span>Amount</span>
					<span>Paid</span>
					<span></span>
				</Table.Header>

				<Table.Body data={bookings} dataName="bookings" render={(booking) => <BookingRow key={booking.id} booking={booking} />} />

				<Table.Footer>
					<Pagination count={count} />
				</Table.Footer>
			</Table>
		</Dropdown>
	);
}
