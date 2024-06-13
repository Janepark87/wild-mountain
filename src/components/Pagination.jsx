import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const P = styled.p`
	margin-left: 0.8rem;
	font-size: 1.4rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	background-color: ${(props) => (props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);
	}
`;

const PageNumber = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3rem;
	font-weight: 500;
	font-size: 1.4rem;
`;

export default function Pagination({ count }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageValue = searchParams.get('page');
	const currentPage = !pageValue ? 1 : Number(pageValue);
	const totalPageNumber = Math.ceil(count / PAGE_SIZE);

	const nextPage = () => {
		const next = currentPage === totalPageNumber ? currentPage : currentPage + 1;
		searchParams.set('page', next);
		setSearchParams(searchParams);
	};
	const prevPage = () => {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;
		searchParams.set('page', prev);
		setSearchParams(searchParams);
	};

	if (totalPageNumber <= 1) return;
	return (
		<StyledPagination>
			<P>
				Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{currentPage === totalPageNumber ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
			</P>

			<Buttons>
				<PaginationButton onClick={prevPage} disabled={currentPage === 1}>
					<HiChevronLeft /> <span>Previouse</span>
				</PaginationButton>

				<PageNumber>{currentPage}</PageNumber>

				<PaginationButton onClick={nextPage} disabled={currentPage === totalPageNumber}>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}
