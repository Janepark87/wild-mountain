import { useSearchParams } from 'react-router-dom';
import { Select } from './';

export default function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentSortBy = searchParams.get('sortBy') || options.at(options.length - 1).value;

	const handleChange = (e) => {
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	};

	return <Select options={options} value={currentSortBy} type="white" onChange={handleChange} />;
}
