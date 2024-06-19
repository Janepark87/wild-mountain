import { Modal, Button } from '../../components';
import { CreateCabinForm } from './';

export default function AddCabin() {
	return (
		<Modal>
			<Modal.Trigger name="cabin-form">
				<Button style={{ alignSelf: 'flex-end' }}>Add new cabin</Button>
			</Modal.Trigger>

			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}
