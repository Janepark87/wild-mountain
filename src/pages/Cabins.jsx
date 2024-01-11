import CabinTable from '../features/cabins/CabinTable';
import Heading from '../components/Heading';
import Row from '../components/Row';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import Container from '../components/Container';

export default function Cabins() {
	return (
		<Container type="table-container" size="lg">
			<Row type="horizontal">
				<Heading as="h1">Cabins</Heading>
				<CabinTableOperations />
			</Row>

			<CabinTable />
		</Container>
	);
}
