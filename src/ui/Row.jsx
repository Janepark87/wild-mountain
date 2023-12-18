import styled, { css } from 'styled-components';

export const Row = styled.div`
	display: flex;

	${(props) =>
		props.type === 'horizontal' &&
		css`
			justify-content: space-between;
			align-items: center;
		`}
	${(props) =>
		props.type === 'verticle' &&
		css`
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

Row.defaultProps = {
	type: 'horizontal',
};
