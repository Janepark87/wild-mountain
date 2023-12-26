import styled from 'styled-components';
import { useCabinQuery } from '../../hooks/useCabin';
import CabinRow from './CabinRow';
import Spinner from '../../components/Spinner';

const Table = styled.div`
	background-color: var(--color-grey-0);
	border-radius: 7px;
	border: 1px solid var(--color-grey-200);
	font-size: 1.4rem;
	overflow: hidden;
`;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	transition: none;

	padding: 1.6rem 2.4rem;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
`;

export default function CabinTable() {
	const { cabins, isPending } = useCabinQuery();

	if (isPending) return <Spinner />;
	return (
		<Table role="table">
			<TableHeader role="row">
				<div>Image</div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>

			{cabins.map((cabin) => (
				<CabinRow key={cabin.id} cabin={cabin} />
			))}
		</Table>
	);
}
