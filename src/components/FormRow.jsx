import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: ${(props) => (props.orientation === 'vertical' ? '1fr' : '24rem repeat(2, 1fr)')};
	gap: ${(props) => (props.orientation === 'vertical' ? '0.8rem' : '2.4rem')};
	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: ${(props) => (props.orientation === 'vertical' ? 'none' : '1px solid var(--color-grey-100)')};
	}

	/* Special treatment if the row contains buttons, and if it's NOT a vertical row */
	${(props) =>
		props.orientation !== 'vertical' &&
		css`
			&:has(button) {
				display: flex;
				justify-content: flex-end;
				gap: 1.2rem;
			}
		`}
`;

const Label = styled.label`
	font-weight: 500;
`;

const FormError = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

const PreviewImg = styled.img`
	object-fit: cover;
	height: 15rem;
	width: 100%;
`;

export default function FormRow({ label, error, children, updateMode, updateValues, orientation }) {
	return (
		<StyledFormRow orientation={orientation}>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <FormError>{error}</FormError>}
			{updateMode && updateValues.image && <PreviewImg src={updateValues.image} alt={updateValues.name} />}
		</StyledFormRow>
	);
}
