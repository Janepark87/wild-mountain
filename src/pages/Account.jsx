import Container from '../components/Container';
import Heading from '../components/Heading';
import Row from '../components/Row';
import UpdateUserDataForm from '../features/Authentication/UpdateUserDataForm';
import UpdateUserPasswordForm from '../features/Authentication/UpdateUserPasswordForm';

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
