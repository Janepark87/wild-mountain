import { useEffect, useRef } from 'react';

export function useClickAway(handlerFunction, listenerOption = true) {
	const ref = useRef();

	useEffect(() => {
		const handlerClickAway = (e) => {
			if (ref.current && !ref.current.contains(e.target)) handlerFunction();
		};

		document.addEventListener('click', handlerClickAway, listenerOption);
		return () => document.removeEventListener('click', handlerClickAway, listenerOption);
	}, [handlerFunction]);

	return { ref };
}
