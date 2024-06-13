import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { useClickAway } from '../hooks/useClickAway';
import { Media } from '../styles/Breakpoints';

const StyledModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(10, 10, 63, 0.4);
	backdrop-filter: blur(7px);
	transition: all 0.5s;
	z-index: 1001;
`;

const StyledModalInner = styled.div`
	position: relative;
	width: max-content;
	height: max-content;
	max-width: 90rem;
	max-height: 90%;
	padding: 3.5rem;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-sm);
	overflow-y: auto;
	overflow-x: hidden;
	scroll-behavior: smooth;
	overscroll-behavior-y: contain;

	${Media.md`
		width: calc(100% - 6rem);
		max-width: 60rem;
	`}

	${Media.xs`
		padding: 2.5rem;
	`}

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(10, 10, 13, 0.2);
		border-radius: 10px;
		border: 3px solid #fff;
	}

	&::-webkit-scrollbar-track {
		margin: 3px 0;
		background-color: rgba(0, 0, 0, 0);
	}
`;

const Button = styled.button`
	position: absolute;
	top: 1rem;
	right: 1.75rem;
	width: 2.5rem;
	min-width: 2.5rem;
	height: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		padding: 0.25rem;
		font-size: 2.5rem;
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

// Modal Provider
function Modal({ children }) {
	const [typeName, setTypeName] = useState('');

	const closeModal = () => {
		setTypeName('');
		document.body.classList.remove('no-scroll');
	};
	const openModal = (type) => {
		setTypeName(type);
		document.body.classList.add('no-scroll');
	};

	return <ModalContext.Provider value={{ typeName, closeModal, openModal }}>{children}</ModalContext.Provider>;
}

function Trigger({ children, type }) {
	const { openModal } = useModal();

	return cloneElement(children, { onClick: () => openModal(type) });
}

function Window({ children, type, customEvent = true }) {
	const { typeName, closeModal } = useModal();
	const ref = useClickAway(closeModal);

	if (type !== typeName) return null;

	return createPortal(
		<StyledModal>
			<StyledModalInner ref={ref}>
				<Button onClick={closeModal}>
					<HiXMark />
				</Button>

				{!customEvent ? children : cloneElement(children, { onCloseModal: () => closeModal() })}
			</StyledModalInner>
		</StyledModal>,
		document.body
	);
}

Modal.Trigger = Trigger;
Modal.Window = Window;

export default Modal;
