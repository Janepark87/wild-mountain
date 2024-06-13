import styled, { css } from 'styled-components';
import { Media } from '../styles/Breakpoints';
import { Spinner } from './index';

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: ${(props) => (props.orientation === 'vertical' ? '1fr' : '22rem repeat(2, 1fr)')};
	gap: ${(props) => (props.orientation === 'vertical' ? '0.8rem' : '2.4rem')};
	padding: 1.2rem 0;

	${Media.md`
		grid-template-columns: 1fr;
		gap: .5rem;
		border-bottom: 0 !important;
    `}

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

				${Media.sm`
					flex-direction: column;
					padding-top: 2.5rem;

					> button{
						width: 100%
					}
				`}
			}
		`}
`;

const Label = styled.label`
	font-weight: 500;
`;

const FormError = styled.span`
	color: var(--color-red-700);
	font-size: 1.4rem;
	line-height: 1;
`;

const PreviewImgWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const PreviewImg = styled.img`
	width: 100%;
	max-width: 20rem;
	max-height: 15rem;
	object-fit: cover;
	border-radius: var(--border-radius-sm);

	${Media.sm`
		max-width: 100%;
		max-height: 22rem;
		margin-top: 2.5rem;
	`}

	${Media.xxs`
		margin-top: 1.5rem;
	`}
`;

export default function FormRow({ label, error, children, updateValues = {}, previewLoading = false, orientation }) {
	return (
		<StyledFormRow orientation={orientation}>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <FormError>{error}</FormError>}
			{!previewLoading && updateValues.image && (
				<PreviewImgWrapper>
					<PreviewImg src={updateValues.image} alt={updateValues.name} />
				</PreviewImgWrapper>
			)}
			{previewLoading && updateValues.image && <Spinner size='mini' />}
		</StyledFormRow>
	);
}
