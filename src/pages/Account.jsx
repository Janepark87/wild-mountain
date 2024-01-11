import Container from '../components/Container';
import Heading from '../components/Heading';
import Row from '../components/Row';

export default function Account() {
	return (
		<Container>
			<Heading as="h1">Update your account</Heading>

			<Row>
				<Heading as="h3">Update user data</Heading>
				<p>Update user data form</p>
			</Row>

			<Row>
				<Heading as="h3">Update password</Heading>
				<p>Update user password form</p>
			</Row>
		</Container>
	);
}
