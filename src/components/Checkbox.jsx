import styled from 'styled-components';

const StyledCheckbox = styled.div`
	display: flex;
	gap: 1.6rem;

	& input[type='checkbox'] {
		width: 2.4rem;
		height: 2.4rem;
		outline-offset: 2px;
		transform-origin: 0;
		accent-color: var(--color-brand-600);
		cursor: pointer;
	}

	& input[type='checkbox']:disabled {
		accent-color: var(--color-brand-600);
		cursor: not-allowed;
	}

	& label {
		display: flex;
		align-items: center;
		flex: 1;
		gap: 0.8rem;
	}
`;

export default function Checkbox({ children, id, checked, onChange, disabled = false }) {
	return (
		<StyledCheckbox>
			<input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} />
			<label htmlFor={!disabled ? id : ''}>{children}</label>
		</StyledCheckbox>
	);
}
