import styled, { css } from 'styled-components';
import { Media } from '../styles/Breakpoints';

const StyledForm = styled.form`
	${(props) =>
		props.type === 'regular' &&
		css`
			padding: 2.4rem 4rem;
			background-color: var(--color-grey-0);
			border: 1px solid var(--color-grey-100);
			border-radius: var(--border-radius-md);
		`}

	${(props) =>
		props.type === 'modal' &&
		css`
			> .form--row {
				${Media.md`
					grid-template-columns: 1fr;
					gap: .5rem;
					border-bottom: 0 !important;
				`}

				&:has(button) {
					${Media.sm`
						flex-direction: column;
						padding-top: 2.5rem;

						> button{
							width: 100%
						}
					`}
				}

				.avatar {
					${Media.sm`
					max-width: 100%;
					height: auto;
					max-height: 22rem;
					margin-top: 2.5rem;
				`}

					${Media.xxs`
					margin-top: 1.5rem;
				`}
				}
			}
		`}

	overflow: hidden;
	font-size: 1.4rem;
`;

export default function Form({ type = 'regular', children }) {
	return (
		<StyledForm type={type} className={`${type !== 'regular' ? 'modal' : ''}`}>
			{children}
		</StyledForm>
	);
}
