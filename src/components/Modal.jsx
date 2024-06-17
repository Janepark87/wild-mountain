import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useClickAway } from '../hooks/useClickAway';
import { StyledModal, StyledModalInner, StyledModalCloseBtn } from './Modal.style';

const ModalContext = createContext();
const useModal = () => useContext(ModalContext);

// Modal Provider
function Modal({ children }) {
	const [modalName, setModalName] = useState('');

	const closeModal = () => {
		setModalName('');
		document.body.classList.remove('no-scroll');
	};
	const openModal = (name) => {
		setModalName(name);
		document.body.classList.add('no-scroll');
	};

	return <ModalContext.Provider value={{ modalName, closeModal, openModal }}>{children}</ModalContext.Provider>;
}

function Trigger({ children, name }) {
	const { openModal } = useModal();

	return cloneElement(children, { onClick: () => openModal(name) });
}

function Window({ children, name, customEvent = true }) {
	const { modalName, closeModal } = useModal();
	const ref = useClickAway(closeModal, true);

	if (name !== modalName) return null;

	return createPortal(
		<StyledModal>
			<StyledModalInner ref={ref}>
				<StyledModalCloseBtn onClick={closeModal}>
					<HiXMark />
				</StyledModalCloseBtn>

				{!customEvent ? children : cloneElement(children, { onCloseModal: () => closeModal() })}
			</StyledModalInner>
		</StyledModal>,
		document.body
	);
}

Modal.Trigger = Trigger;
Modal.Window = Window;

export default Modal;
