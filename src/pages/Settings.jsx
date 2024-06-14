import { Container, Heading, Row } from '../components';
import { UpdateSettingsForm2 } from '../features/settings';

export default function Settings() {
	return (
		<Container>
			<Row>
				<Heading as="h1">Update hotel settings</Heading>
			</Row>

			<UpdateSettingsForm2 />
		</Container>
	);
}
