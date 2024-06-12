import { Container, Heading, Row } from '../components';
import { CabinTable, CabinTableOperations } from '../features/cabins';

export default function Cabins() {
	return (
		<Container type='table-container' size='lg'>
			<Row type='horizontal'>
				<Heading as='h1'>Cabins</Heading>
				<CabinTableOperations />
			</Row>

			<CabinTable />
		</Container>
	);
}
