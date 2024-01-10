import TableOperations from '../../components/TableOperations';
import Filter from '../../components/Filter';
import SortBy from '../../components/SortBy';

export default function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'checked-in', label: 'Checked in' },
					{ value: 'checked-out', label: 'Checked out' },
					{ value: 'unconfirmed', label: 'Unconfirmed' },
				]}
			/>

			<SortBy
				options={[
					{ value: 'totalPrice-asc', label: 'Amount (low first)' },
					{ value: 'totalPrice-desc', label: 'Amount (high first)' },
					{ value: 'startDate-asc', label: 'Date (earlier first)' },
					{ value: 'startDate-desc', label: 'Date (recent first)' },
				]}
			/>
		</TableOperations>
	);
}
