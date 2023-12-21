import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Heading from '../components/Heading';
import Row from '../components/Row';
import Button from '../components/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

export default function Cabins() {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Cabins</Heading>
				<p>Filter / sort</p>
			</Row>

			<Row>
				<CabinTable />

				<Button onClick={() => setShowForm((show) => !show)}>Add new cabin</Button>
				{showForm && <CreateCabinForm />}
			</Row>
		</>
	);
}
