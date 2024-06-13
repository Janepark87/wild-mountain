import { Container, Heading, Row } from '../components';
import { DashboardContent, DashboardFilter } from '../features/dashboard';

export default function Dashboard() {
	return (
		<Container type="table-container" size="xl">
			<Row type="horizontal">
				<Heading as="h1">Dashboard</Heading>
				<DashboardFilter />
			</Row>

			<DashboardContent />
		</Container>
	);
}
