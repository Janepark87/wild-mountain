import Container from '../components/Container';
import Heading from '../components/Heading';
import Row from '../components/Row';
import DashboardContent from '../features/dashboard/DashboardContent';
import DashboardFilter from '../features/dashboard/DashboardFilter';

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
