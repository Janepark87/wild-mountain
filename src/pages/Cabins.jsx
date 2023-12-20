import { useEffect } from 'react';
import { Heading } from '../components/Heading';
import { Row } from '../components/Row';
import { getCabins } from '../services/apiCabins';

export default function Cabins() {
	useEffect(() => {
		getCabins().then((data) => console.log(data));
	}, []);

	return (
		<Row type="horizontal">
			<Heading as="h1">Cabins</Heading>
			<p>Cabins page..</p>
		</Row>
	);
}
