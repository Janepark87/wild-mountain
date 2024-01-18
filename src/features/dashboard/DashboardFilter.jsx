import Filter from '../../components/Filter';

export default function DashboardFilter() {
	return (
		<Filter
			filterField="last"
			options={[
				{ value: '7', label: '7 days' },
				{ value: '30', label: '30 days' },
				{ value: '90', label: '90 days' },
			]}
		/>
	);
}
