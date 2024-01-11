import Container from '../components/Container';
import Heading from '../components/Heading';
import Row from '../components/Row';

export default function Dashboard() {
	return (
		<Container>
			<Row type="horizontal">
				<Heading as="h1">Dashboard</Heading>
				<p>dashboard page..</p>
			</Row>
		</Container>
	);
}
