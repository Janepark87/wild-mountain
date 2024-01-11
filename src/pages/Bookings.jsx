import Container from '../components/Container';
import Heading from '../components/Heading';
import Row from '../components/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

export default function Bookings() {
	return (
		<Container type="table-container" size="xl">
			<Row type="horizontal">
				<Heading as="h1">Bookings</Heading>
				<BookingTableOperations />
			</Row>

			<BookingTable />
		</Container>
	);
}
