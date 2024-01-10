import Heading from '../components/Heading';
import Row from '../components/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

export default function Bookings() {
	return (
		<div className="table-container">
			<Row type="horizontal">
				<Heading as="h1">Bookings</Heading>
				<BookingTableOperations />
			</Row>

			<BookingTable />
		</div>
	);
}
