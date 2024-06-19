import styled from 'styled-components';

const StyledEmpty = styled.p`
	padding: 1.6rem 2.4rem;
`;

export default function Empty({ dataName }) {
	return <StyledEmpty>No {dataName} could be found.</StyledEmpty>;
}
