import { Modal, Button, ButtonGroup } from '../../components';
import { CreateCabinForm } from './index';

export default function AddCabin() {
	return (
		<Modal>
			<Modal.Trigger name="cabin-form">
				<ButtonGroup>
					<Button>Add new cabin</Button>
				</ButtonGroup>
			</Modal.Trigger>

			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}
