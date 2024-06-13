import styled from 'styled-components';
import { HiEllipsisVertical, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { formatCurrency } from '../../utils/helpers';
import { Table, Modal, EllipsisDropdown, ConfirmDelete } from '../../components';
import { CreateCabinForm } from './index';

const Img = styled.img`
	width: 100%;
	max-width: 7rem;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: var(--border-radius-sm);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;
	const { deleteCabinMutate, isCabinDeleting } = useDeleteCabin();
	const { careateUpdateCabinMutate, isCabinCreatingUpdating } = useCreateUpdateCabin();

	const duplicateCabin = () => {
		const copyCabin = {
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			image,
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

						<Modal.Trigger type='cabin-form-edit'>
							<EllipsisDropdown.Item icon={<HiPencil />}>Edit</EllipsisDropdown.Item>
						</Modal.Trigger>

						<Modal.Trigger type='cabin-delete-confirmation'>
							<EllipsisDropdown.Item icon={<HiTrash />}>Delete</EllipsisDropdown.Item>
						</Modal.Trigger>
					</EllipsisDropdown.Menu>

					<Modal.Window type='cabin-form-edit'>
						<CreateCabinForm updateCabin={cabin} />
					</Modal.Window>

					<Modal.Window type='cabin-delete-confirmation'>
						<ConfirmDelete resource='Cabin' disabled={isCabinDeleting} onConfirm={() => deleteCabinMutate(cabinId)} />
					</Modal.Window>
				</Modal>
			</EllipsisDropdown.Inner>
		</Table.Row>
	);
}
