import CabinTable from '../features/cabins/CabinTable';
import Heading from '../components/Heading';
import Row from '../components/Row';
import AddCabin from '../features/cabins/AddCabin';

export default function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Cabins</Heading>
				<p>Filter / sort</p>
			</Row>

			<CabinTable dir="rtl" />

			<AddCabin />
		</>
	);
}
