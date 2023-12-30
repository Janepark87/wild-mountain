import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.OpenTrigger type="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.OpenTrigger>
				<Modal.Window type="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}
