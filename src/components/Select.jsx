import styled from 'styled-components';

const StyledSelect = styled.select`
	padding: 0.8rem 1.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid ${(props) => (props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	font-size: 1.4rem;
	font-weight: 500;
	cursor: pointer;
`;

export default function Select({ options, value, onChange, ...rest }) {
	return (
		<StyledSelect value={value} onChange={onChange} {...rest}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}
