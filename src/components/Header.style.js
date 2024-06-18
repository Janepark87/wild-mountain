import styled from 'styled-components';
import { Media } from '../styles/Breakpoints';

export const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem 1.5rem;
	background-color: var(--color-grey-0);
	border-bottom: 1px solid var(--color-grey-100);

	${Media.sm`
		justify-content: space-between;

		.hidden-sm {
			display: none;
		}
	`}
`;

export const StyledHeaderMenu = styled.ul`
	display: flex;
	align-items: center;

	> li > button {
		padding: 1rem;
		line-height: 0;

		${Media.sm`
			font-size: 1.75rem;
			padding: .75rem !important;
        `}
	}

	> li:last-child > button {
		padding: 1rem 1.25rem;

		${Media.sm`
            > span{
                display: none;
            }
        `}
	}
`;

export const StyledMobileWrapper = styled.div`
	display: none;
	align-items: center;
	gap: 0.5rem;

	${Media.sm`
		display: flex;
	`}

	#hamburger {
		transform: rotate(90deg);
	}
`;

export const StyledMobileLogo = styled.div`
	a {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.5rem;

		img {
			width: 3rem;
		}

		${Media.xs`
			width: 3rem;
			height: 3rem;

			img{ 
				width: 100%;
			}

            span{
                display: none;
            }
        `}
	}
`;
