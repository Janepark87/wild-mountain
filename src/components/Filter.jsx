import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const StyledFilter = styled.div`
	display: flex;
	gap: 0.4rem;
	padding: 0.4rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
`;

const FilterButton = styled.button`
	padding: 0.44rem 0.8rem;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	border: none;
	transition: all 0.3s;

	${(props) =>
		props.active &&
		css`
			color: var(--color-brand-50);
			background-color: var(--color-brand-600);
		`}

	&:hover:not(:disabled) {
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);
	}

	&:disabled {
		color: var(--color-brand-50) !important;
		background-color: var(--color-brand-600) !important;
	}
`;

export default function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	function handleClick(value) {
		searchParams.set(filterField, value);
		if (searchParams.get('page')) searchParams.set('page', 1);
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					$active={option.value === currentFilter}
					disabled={option.value === currentFilter}>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}
