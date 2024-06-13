import styled from 'styled-components';
import { Media } from '../styles/Breakpoints';
import { Heading, Button } from './index';

const StyledConfirmDelete = styled.div`
	max-width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	${Media.md`
		max-width: 100%;
	`}

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;

		${Media.sm`
			flex-direction: column;

			> button{
				width: 100%
			}
		`}
	}
`;

export default function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
	return (
		<StyledConfirmDelete>
			<Heading as='h3'>Delete {resource}</Heading>
			<p>Are you sure you want to delete this {resource} permanently? This action cannot be undone.</p>

			<div>
				<Button variation='secondary' onClick={onCloseModal}>
					Cancel
				</Button>
				<Button variation='danger' onClick={onConfirm} disabled={disabled}>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}
