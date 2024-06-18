import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
	const [menuToggle, setMenuToggle] = useState(false);

	const closeNav = () => {
		setMenuToggle(false);
		document.body.classList.remove('no-scroll');
	};
	const openNav = () => {
		setMenuToggle(true);
		document.body.classList.add('no-scroll');
	};

	return <NavigationContext.Provider value={{ menuToggle, setMenuToggle, closeNav, openNav }}>{children}</NavigationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppNavigation() {
	const context = useContext(NavigationContext);

	if (context === undefined) throw new Error('NavigationContext was used outside of Provider. The context can only be used in children of the Provider');
	return context;
}
