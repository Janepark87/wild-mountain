import { HiEllipsisVertical, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { formatCurrency } from '../../utils/helpers';
import { Table, Modal, EllipsisDropdown, ConfirmDelete } from '../../components';
import { Img, Cabin, Price, Discount } from './styles/Cabins.style';
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

			<EllipsisDropdown.Inner>
				<Modal>
					<EllipsisDropdown.Toggle id={cabinId}>
						<HiEllipsisVertical />
					</EllipsisDropdown.Toggle>

					<EllipsisDropdown.Menu id={cabinId}>
						<EllipsisDropdown.Item icon={<HiSquare2Stack />} onClick={duplicateCabin} disabled={isCabinCreatingUpdating}>
							Copy
						</EllipsisDropdown.Item>

						<Modal.Trigger type="cabin-form-edit">
							<EllipsisDropdown.Item icon={<HiPencil />}>Edit</EllipsisDropdown.Item>
						</Modal.Trigger>

						<Modal.Trigger type="cabin-delete-confirmation">
							<EllipsisDropdown.Item icon={<HiTrash />}>Delete</EllipsisDropdown.Item>
						</Modal.Trigger>
					</EllipsisDropdown.Menu>

					<Modal.Window type="cabin-form-edit">
						<CreateCabinForm updateCabin={cabin} />
					</Modal.Window>

					<Modal.Window type="cabin-delete-confirmation">
						<ConfirmDelete resource="Cabin" disabled={isCabinDeleting} onConfirm={() => deleteCabinMutate(cabinId)} />
					</Modal.Window>
				</Modal>
			</EllipsisDropdown.Inner>
		</Table.Row>
	);
}
