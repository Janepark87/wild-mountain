import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickAway } from '../hooks/useClickAway';

const StyledDropdownInner = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	padding: 0.4rem;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledMenu = styled.ul`
	position: absolute;
	top: 2rem;
	right: 2rem;
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);
	z-index: 1000;
`;

const StyledItem = styled.button`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	width: 100%;
	padding: 1.2rem 2.4rem;
	text-align: left;
	background: none;
	border: none;
	font-size: 1.4rem;
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

const DropdownContext = createContext();
const useDropdown = () => useContext(DropdownContext);

function Dropdown({ children }) {
	const [openId, setOpenId] = useState('');

	const openMenu = setOpenId;
	const closeMenu = () => setOpenId('');

	return (
		<DropdownContext.Provider value={{ openId, openMenu, closeMenu }}>
			<StyledDropdownInner>{children}</StyledDropdownInner>
		</DropdownContext.Provider>
	);
}

function Toggle({ id }) {
	const { openId, openMenu, closeMenu } = useDropdown();

	const handleClick = (e) => {
		e.stopPropagation();
		openId === '' || openId !== id ? openMenu(id) : closeMenu();
	};

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function Menu({ id, children }) {
	const { openId, closeMenu } = useDropdown();
	const ref = useClickAway(closeMenu, false);

	if (openId !== id) return;
	return <StyledMenu ref={ref}>{children}</StyledMenu>;
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

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
