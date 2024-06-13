import { Container, Heading, Row } from '../components';
import { AddCabin, CabinTable, CabinTableOperations } from '../features/cabins';

export default function Cabins() {
	return (
		<Container type='table-container' size='lg'>
			<Row type='horizontal'>
				<Heading as='h1'>Cabins</Heading>
				<CabinTableOperations />
			</Row>

			<AddCabin />
			<CabinTable />
		</Container>
	);
}
