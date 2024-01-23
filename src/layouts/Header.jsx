import styled from 'styled-components';
import HeaderMenu from '../components/HeaderMenu';

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem 1.25rem;
	background-color: var(--color-grey-0);
	border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header() {
	return (
		<StyledHeader>
			<HeaderMenu />
		</StyledHeader>
	);
}
