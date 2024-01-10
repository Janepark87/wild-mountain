import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBookings } from '../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

export function useBookingQuery() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// Filter
	const filterFields = ['status', 'numNights', 'totalPrice'];
	const operatorName = { status: 'eq', numNights: 'lte', totalPrice: 'gte' };
	const filters = filterFields
		.map((field) => {
			const value = searchParams.get(field);

			if (value && value !== 'all') {
				const operator = operatorName[field] || 'eq';
				return { field, value, operator };
			}
		})
		.filter(Boolean);

	// Sort
	const sortByField = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByField.split('-');
	const sortBy = { field, direction };

	// Pagination
	const pageValue = searchParams.get('page');
	const page = !pageValue ? 1 : Number(pageValue);

	// Query
	const {
		data: { data: bookings, count } = {},
		isPending: isBookingLoading,
		isError: isBookingError,
	} = useQuery({
		queryKey: ['bookings', filters, sortBy, page],
		queryFn: () => getBookings({ filters, sortBy, page }),
	});

	// Function to prefetch pages
	const prefetchPage = (pageOffset) => {
		const targetPage = page + pageOffset;
		const totalPageNumber = Math.ceil(count / PAGE_SIZE);

		if (targetPage >= 1 && targetPage <= totalPageNumber) {
			queryClient.prefetchQuery({
				queryKey: ['bookings', filters, sortBy, targetPage],
				queryFn: () => getBookings({ filters, sortBy, page: targetPage }),
			});
		}
	};

	// Pre-fetching for next and previous pages
	prefetchPage(1); // Next
	prefetchPage(-1); // Previous

	return { bookings, count, isBookingLoading, isBookingError };
}
