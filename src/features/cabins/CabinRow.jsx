import styled from 'styled-components';
import { HiEllipsisVertical, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { formatCurrency } from '../../utils/helpers';
import Table from '../../components/Table';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import Dropdown from '../../components/Dropdown';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	font-size: 10px;
	/* transform: scale(1.66666) translateX(-2px); */
	transform: scale(1.5) translateX(-7px);
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

			<Dropdown>
				<Modal>
					<Dropdown.Toggle id={cabinId}>
						<HiEllipsisVertical />
					</Dropdown.Toggle>

					<Dropdown.Menu id={cabinId}>
						<Dropdown.Item icon={<HiSquare2Stack />} onClick={duplicateCabin} disabled={isCabinCreatingUpdating}>
							Copy
						</Dropdown.Item>

						<Modal.Trigger type="cabin-form-edit">
							<Dropdown.Item icon={<HiPencil />}>Edit</Dropdown.Item>
						</Modal.Trigger>

						<Modal.Trigger type="cabin-delete-confirmation">
							<Dropdown.Item icon={<HiTrash />}>Delete</Dropdown.Item>
						</Modal.Trigger>
					</Dropdown.Menu>

					<Modal.Window type="cabin-form-edit">
						<CreateCabinForm updateCabin={cabin} />
					</Modal.Window>

					<Modal.Window type="cabin-delete-confirmation">
						<ConfirmDelete resource="Cabin" disabled={isCabinDeleting} onConfirm={() => deleteCabinMutate(cabinId)} />
					</Modal.Window>
				</Modal>
			</Dropdown>
		</Table.Row>
	);
}
