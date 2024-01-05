import TableOperations from '../../components/TableOperations';
import Filter from '../../components/Filter';

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
		</TableOperations>
	);
}
