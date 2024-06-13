import { Container, Heading } from '../components';
import { SingupForm } from '../features/authentication';

export default function Users() {
	return (
		<Container>
			<Heading as="h1">Create a new user</Heading>
			<SingupForm />
		</Container>
	);
}
