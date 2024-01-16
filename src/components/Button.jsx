import styled, { css } from 'styled-components';

const sizes = {
	sm: css`
		font-size: 1.2rem;
		padding: 0.4rem 0.8rem;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	`,
	md: css`
		font-size: 1.4rem;
		padding: 1.2rem 1.6rem;
		font-weight: 500;
	`,
	lg: css`
		font-size: 1.6rem;
		padding: 1.2rem 2.4rem;
		font-weight: 500;
	`,
};

const variations = {
	primary: css`
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);

		&:hover {
			background-color: var(--color-brand-700);
		}
	`,
	secondary: css`
		color: var(--color-grey-600);
		background: var(--color-grey-0);
		border: 1px solid var(--color-grey-200);

		&:hover,
		&:disabled {
			background-color: var(--color-grey-50) !important;
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-700);

		&:hover {
			background-color: var(--color-red-800);
		}
	`,
	ghost: css`
		color: var(--color-brand-600);
		background-color: transparent;
		border: none;
		box-shadow: none;
		font-weight: 500;
		text-align: center;

		&:hover,
		&:active {
			color: var(--color-brand-700);
			background-color: var(--color-brand-50);
		}
	`,
};

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	border: 0;
	outline: none;
	cursor: pointer;
	transition: all 0.3s;

	${(props) => sizes[props.size]}
	${(props) => variations[props.variation]}

	> svg {
		font-size: inherit;
	}
`;

Button.defaultProps = {
	size: 'md',
	variation: 'primary',
};

Button.shouldForwardProp = () => true;

export default Button;
