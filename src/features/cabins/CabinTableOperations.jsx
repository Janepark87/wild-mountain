import { TableOperations, Filter, SortBy } from '../../components';

export default function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'no-discount', label: 'No discount' },
					{ value: 'with-discount', label: 'With discount' },
				]}
			/>

			<SortBy
				options={[
					{ value: 'name-asc', label: 'Name (a-z)' },
					{ value: 'name-desc', label: 'Name (z-a)' },
					{ value: 'regularPrice-asc', label: 'Price (low first)' },
					{ value: 'regularPrice-desc', label: 'Price (high first)' },
					{ value: 'maxCapacity-asc', label: 'Capacity (low first)' },
					{ value: 'maxCapacity-desc', label: 'Capacity (high first)' },
					{ value: 'created_at-asc', label: 'Create date (oldest)' },
					{ value: 'created_at-desc', label: 'Create date (newest)' },
				]}
			/>
		</TableOperations>
	);
}
