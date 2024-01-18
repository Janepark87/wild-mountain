import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// The initial rendering is determined based on both the local storage and the system's color scheme preferences to establish the starting state.
		const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && isDarkModePreferred);

		setIsDarkMode(isDark);
		updateDarkMode(isDark);
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode((isDark) => !isDark);
		updateDarkMode(!isDarkMode);
	};

	return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
	const context = useContext(DarkModeContext);

	if (context === undefined) throw new Error('Used DarkModeContext outside of Provider. The context can only be used in children of the Provider');

	return context;
}

function updateDarkMode(isDark) {
	const element = document.documentElement.classList;
	if (isDark) {
		element.add('dark-mode');
		localStorage.theme = 'dark';
	} else {
		element.remove('dark-mode');
		localStorage.theme = 'light';
	}
}
