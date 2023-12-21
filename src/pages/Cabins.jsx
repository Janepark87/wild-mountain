import CabinTable from '../features/cabins/CabinTable';
import { Heading } from '../components/Heading';
import { Row } from '../components/Row';

export default function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Cabins</Heading>
				<p>Filter / sort</p>
			</Row>

			<Row>
				<CabinTable />
			</Row>
		</>
	);
}
