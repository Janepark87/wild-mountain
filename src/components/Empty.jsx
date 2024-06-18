import styled from 'styled-components';

const StyledEmpty = styled.p`
	padding: 1.6rem 2.4rem;
`;

export default function Empty({ resource }) {
	return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}
