import { useSearchParams } from 'react-router-dom';
import { Select } from './index';

export default function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sortBy') || '';

	const handleChange = (e) => {
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	};

	return <Select options={options} value={sortBy} type="white" onChange={handleChange} />;
}
