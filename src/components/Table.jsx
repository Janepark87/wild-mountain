import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: 7px;
	font-size: 1.4rem;
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2rem;
	align-items: center;
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;
	color: var(--color-grey-600);
	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	border-radius: inherit;
`;

const StyledBody = styled.section`
	margin: 0;
`;

const StyledRow = styled(CommonRow)`
	padding: 1.3rem 2rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	padding: 1.2rem;
	background-color: var(--color-grey-50);
	border-radius: inherit;

	&:not(:has(*)) {
		display: none;
	}
`;

const Empty = styled.p`
	margin: 2.4rem;
	text-align: center;
	font-size: 1.6rem;
	font-weight: 500;
`;

const TableContext = createContext();
const useTable = () => useContext(TableContext);

function Table({ children, columns }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

function Header({ children }) {
	const { columns } = useTable();

	return (
		<StyledHeader role="row" as="header" $columns={columns}>
			{children}
		</StyledHeader>
	);
}

function Row({ children }) {
	const { columns } = useTable();

	return (
		<StyledRow role="row" $columns={columns}>
			{children}
		</StyledRow>
	);
}

// Render props pattern
function Body({ data, render }) {
	if (!data.length) return <Empty>No data to show at the moment.</Empty>;

	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
