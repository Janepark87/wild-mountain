import Container from '../components/Container';
import Heading from '../components/Heading';
import SingupForm from '../features/Authentication/SingupForm';

export default function Users() {
	return (
		<Container>
			<Heading as="h1">Create a new user</Heading>
			<SingupForm />
		</Container>
	);
}
