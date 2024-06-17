import { useEffect, useRef } from 'react';

export function useClickAway(handlerFunction, listenCapturing = false) {
	const ref = useRef();

	useEffect(() => {
		const handlerClickAway = (e) => {
			if (ref.current && !ref.current?.contains(e.target)) handlerFunction();
		};

		document.addEventListener('click', handlerClickAway, listenCapturing);

		return () => document.removeEventListener('click', handlerClickAway, listenCapturing);
	}, [handlerFunction, listenCapturing]);

	return ref;
}
