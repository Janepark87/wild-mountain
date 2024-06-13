import { Container, Heading, Row } from '../components';
import { BookingTable, BookingTableOperations } from '../features/bookings';

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
