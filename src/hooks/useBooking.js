import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBookings } from '../services/apiBookings';

export function useBookingQuery() {
	const {
		data: bookings,
		isPending: isBookingLoading,
		isError: isBookingError,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: getBookings,
	});

	return { bookings, isBookingLoading, isBookingError };
}
