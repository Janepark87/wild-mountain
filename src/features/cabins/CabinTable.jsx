import { useCabinQuery } from '../../hooks/useCabin';
import Table from '../../components/Table';
import CabinRow from './CabinRow';
import Spinner from '../../components/Spinner';

export default function CabinTable() {
	const { cabins, isCabinsLoading } = useCabinQuery();

	if (isCabinsLoading) return <Spinner />;
	return (
		<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header>
				<span>Image</span>
				<span>Cabin</span>
				<span>Capacity</span>
				<span>Price</span>
				<span>Discount</span>
				<span></span>
			</Table.Header>

			<Table.Body data={cabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
		</Table>
	);
}
