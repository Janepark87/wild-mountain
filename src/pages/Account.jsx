import { Container, Heading, Row } from '../components';
import { UpdateUserDataForm, UpdateUserPasswordForm } from '../features/authentication';

export default function Account() {
	return (
		<Container>
			<Heading as="h1">Update your account</Heading>

			<Row>
				<Heading as="h3">Update user data</Heading>
				<UpdateUserDataForm />
			</Row>

			<Row>
				<Heading as="h3">Update password</Heading>
				<UpdateUserPasswordForm />
			</Row>
		</Container>
	);
}
