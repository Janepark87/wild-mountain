import Heading from '../components/Heading';
import Row from '../components/Row';
import BookingTable from '../features/bookings/BookingTable';

export default function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Bookings</Heading>
				<p>Filter/Sort</p>
			</Row>

			<BookingTable />
		</>
	);
}
