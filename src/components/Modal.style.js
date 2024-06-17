import styled from 'styled-components';
import { Media } from '../styles/Breakpoints';

export const StyledModal = styled.div`
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

export const StyledModalInner = styled.div`
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

export const StyledModalCloseBtn = styled.button`
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
