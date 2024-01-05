import CabinTable from '../features/cabins/CabinTable';
import Heading from '../components/Heading';
import Row from '../components/Row';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

export default function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Cabins</Heading>
				<CabinTableOperations />
			</Row>

			<CabinTable />

			<AddCabin />
		</>
	);
}
