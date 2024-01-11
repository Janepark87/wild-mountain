import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateCabinForm from './CreateCabinForm';
import ButtonGroup from '../../components/ButtonGroup';

export default function AddCabin() {
	return (
		<ButtonGroup>
			<Modal>
				<Modal.Trigger type="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Trigger>
				<Modal.Window type="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</ButtonGroup>
	);
}
