import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { duplicateImage } from '../../services/apiCabins';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { Modal, Dropdown, ConfirmDelete } from '../../components';
import { CreateCabinForm } from './';

export default function CabinRowEllipsisDropdown({ cabin }) {
	const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;
	const { deleteCabinMutate, isCabinDeleting } = useDeleteCabin();
	const { careateUpdateCabinMutate, isCabinCreatingUpdating } = useCreateUpdateCabin();

	const duplicateCabin = async () => {
		const copyImage = await duplicateImage(image);
		const copyCabin = {
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			image: copyImage,
		};

		careateUpdateCabinMutate({ cabinData: copyCabin });
	};

	return (
		<Dropdown.Inner>
			<Modal>
				<Dropdown.Trigger id={cabinId} />

				<Dropdown.List id={cabinId}>
					<Dropdown.Item icon={<HiSquare2Stack />} onClick={duplicateCabin} disabled={isCabinCreatingUpdating}>
						Duplicate
					</Dropdown.Item>

					<Modal.Trigger name="cabin-form-edit">
						<Dropdown.Item icon={<HiPencil />}>Edit</Dropdown.Item>
					</Modal.Trigger>

					<Modal.Trigger name="cabin-delete-confirmation">
						<Dropdown.Item icon={<HiTrash />}>Delete</Dropdown.Item>
					</Modal.Trigger>
				</Dropdown.List>

				<Modal.Window name="cabin-form-edit">
					<CreateCabinForm updateCabin={cabin} />
				</Modal.Window>

				<Modal.Window name="cabin-delete-confirmation">
					<ConfirmDelete resource="Cabin" disabled={isCabinDeleting} onConfirm={() => deleteCabinMutate(cabinId)} />
				</Modal.Window>
			</Modal>
		</Dropdown.Inner>
	);
}
