import styled, { css } from 'styled-components';
import { Media } from '../styles/Breakpoints';

const sizes = {
	sm: css`
		width: 70rem;
	`,
	md: css`
		width: 85rem;
	`,
	lg: css`
		width: 100rem;
	`,
	xl: css`
		width: 120rem;
	`,
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	margin: 0 auto;
	max-width: 120rem;

	${(props) =>
		props.type === 'default' &&
		css`
			${Media.lg`
				${(props) => sizes[props.size]}
			`}
		`}

	${(props) =>
		props.type === 'table-container' &&
		css`
			${Media.xl`
				${(props) => sizes[props.size]}
			`}
		`}
`;

Container.defaultProps = {
	size: 'md',
	type: 'default',
};

export default Container;
