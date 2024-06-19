import { formatCurrency } from '../../utils/helpers';
import { Table } from '../../components';
import { CabinRowEllipsisDropdown } from './';
import { Img, Cabin, Price, Discount } from './styles/CabinRow.style';

export default function CabinRow({ cabin }) {
	const { name, maxCapacity, regularPrice, discount, image } = cabin;

	return (
		<Table.Row>
			<Img src={image} alt={name} />

			<Cabin>{name}</Cabin>

			<div>Fits up to {maxCapacity} guests</div>

			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

			<CabinRowEllipsisDropdown cabin={cabin} />
		</Table.Row>
	);
}
