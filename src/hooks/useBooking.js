import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBookings } from '../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookingQuery() {
	const [searchParams] = useSearchParams();

	// Filter
	const filterFields = ['status', 'numNights', 'totalPrice'];
	const operatorName = { status: 'eq' };
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

	const {
		data: bookings,
		isPending: isBookingLoading,
		isError: isBookingError,
	} = useQuery({
		queryKey: ['bookings', filters, sortBy],
		queryFn: () => getBookings(filters, sortBy),
	});

	return { bookings, isBookingLoading, isBookingError };
}
