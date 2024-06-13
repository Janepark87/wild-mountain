import { Modal, Button, ButtonGroup } from '../../components';
import { CreateCabinForm } from './index';

export default function AddCabin() {
	return (
		<ButtonGroup>
			<Modal>
				<Modal.Trigger type="cabin-form-create">
					<Button>Add new cabin</Button>
				</Modal.Trigger>

				<Modal.Window type="cabin-form-create">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</ButtonGroup>
	);
}
