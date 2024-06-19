import { createContext, useContext } from 'react';
import { Footer, StyledBody, StyledHeader, StyledRow, StyledTable } from './Table.style';
import { Empty } from './';

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
function Body({ data, render, dataName }) {
	if (!data.length) return <Empty dataName={dataName} />;

	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
