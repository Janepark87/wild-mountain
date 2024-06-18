import { useSearchParams } from 'react-router-dom';
import { useCabinQuery } from '../../hooks/useCabin';
import { Spinner, Table, Dropdown } from '../../components';
import { CabinRow } from './index';

export default function CabinTable() {
	const { cabins, isCabinsLoading } = useCabinQuery();
	const [searchParams] = useSearchParams();

	if (isCabinsLoading) return <Spinner />;

	// filter by discount
	const filterValue = searchParams.get('discount') || 'all';
	const filteredCabins = filterValue === 'all' ? cabins : filterValue === 'no-discount' ? cabins.filter((cabin) => cabin.discount === 0) : cabins.filter((cabin) => cabin.discount > 0);

	// sort by
	const sortByValue = searchParams.get('sortBy') || 'created_at-desc';
	const [field, direction] = sortByValue.split('-');
	const modifire = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins.sort((a, b) => {
		if (field === 'name') {
			return a.name.localeCompare(b.name) * modifire;
		} else if (field === 'created_at') {
			const dateA = new Date(a.created_at);
			const dateB = new Date(b.created_at);

			return (dateA - dateB) * modifire;
		} else {
			return (a[field] - b[field]) * modifire;
		}
	});

	return (
		<Dropdown>
			<Table columns=".8fr 1.8fr 1.5fr 1.5fr 1.5fr 1fr">
				<Table.Header>
					<span>Image</span>
					<span>Cabin</span>
					<span>Capacity</span>
					<span>Price</span>
					<span>Discount</span>
					<span></span>
				</Table.Header>

				<Table.Body data={sortedCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
			</Table>
		</Dropdown>
	);
}
