import { createContext, useContext, useState } from 'react';
import { useClickAway } from '../hooks/useClickAway';
import { Inner, StyledItem, StyledList, StyledTrigger } from './Dropdown.style';
import { HiEllipsisVertical } from 'react-icons/hi2';

const DropdownContext = createContext();
const useDropdown = () => useContext(DropdownContext);

function Dropdown({ children }) {
	const [openId, setOpenId] = useState('');

	const openMenu = (id) => setOpenId(id);
	const closeMenu = () => setOpenId('');

	return <DropdownContext.Provider value={{ openId, openMenu, closeMenu }}>{children}</DropdownContext.Provider>;
}

function Trigger({ id, children, ellipsis = true }) {
	const { openId, openMenu, closeMenu } = useDropdown();

	const handleClick = (e) => {
		e.stopPropagation();
		openId === '' || openId !== id ? openMenu(id) : closeMenu();
	};

	return <StyledTrigger onClick={handleClick}>{ellipsis ? <HiEllipsisVertical /> : children}</StyledTrigger>;
}

function List({ id, children }) {
	const { openId, closeMenu } = useDropdown();
	const ref = useClickAway(closeMenu);

	if (openId !== id) return;
	return <StyledList ref={ref}>{children}</StyledList>;
}

function Item({ children, icon, onClick }) {
	const { closeMenu } = useDropdown();

	const handleClick = () => {
		onClick?.();
		closeMenu();
	};

	return (
		<li>
			<StyledItem onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledItem>
		</li>
	);
}

Dropdown.Inner = Inner;
Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;
