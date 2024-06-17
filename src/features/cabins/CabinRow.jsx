import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { formatCurrency } from '../../utils/helpers';
import { Table, Modal, Dropdown, ConfirmDelete } from '../../components';
import { Img, Cabin, Price, Discount } from './styles/CabinRow.style';
import { CreateCabinForm } from './index';
import { duplicateImage } from '../../services/apiCabins';

export default function CabinRow({ cabin }) {
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
		<Table.Row>
			<Img src={image} alt={name} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

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
		</Table.Row>
	);
}
