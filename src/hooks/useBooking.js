import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteBooking, getBooking, getBookings } from '../services/apiBookings';
import { PAGE_SIZE } from '../utils/constants';

export function useBookings() {
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

export function useBooking() {
	const { bookingId } = useParams();

	const {
		data: booking,
		isPending: isBookingLoading,
		isError: isBookingError,
	} = useQuery({
		queryKey: ['bookings', bookingId],
		queryFn: () => getBooking(bookingId),
		// retry: false,
	});

	return { booking, isBookingLoading, isBookingError };
}

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { mutate: deleteBookingMutate, isPending: isBookingDeleting } = useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success('Booking succesfully deleted');
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteBookingMutate, isBookingDeleting };
}
