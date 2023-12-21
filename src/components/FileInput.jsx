import styled from 'styled-components';

const FileInput = styled.input`
	font-size: 1.4rem;
	border-radius: var(--border-radius-sm);

	&::file-selector-button {
		padding: 0.8rem 1.2rem;
		margin-right: 1.2rem;
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);
		border: none;
		border-radius: var(--border-radius-sm);
		font: inherit;
		font-weight: 500;
		transition: color 0.2s, background-color 0.2s;
		cursor: pointer;

		&:hover {
			background-color: var(--color-brand-700);
		}
	}
`;

export default FileInput;
