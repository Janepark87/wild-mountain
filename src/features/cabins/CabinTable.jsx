import { useCabinQuery } from '../../hooks/useCabin';
import Table from '../../components/Table';
import CabinRow from './CabinRow';
import Spinner from '../../components/Spinner';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
	const { cabins, isCabinsLoading } = useCabinQuery();
	const [searchParams] = useSearchParams();

	if (isCabinsLoading) return <Spinner />;

	const filterDiscount = searchParams.get('discount') || 'all';

	const filteredDiscount =
		filterDiscount === 'all'
			? cabins
			: filterDiscount === 'no-discount'
			? cabins.filter((cabin) => cabin.discount === 0)
			: cabins.filter((cabin) => cabin.discount > 0);

	const filteredCabins = filteredDiscount;

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

			<Table.Body data={filteredCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
		</Table>
	);
}
