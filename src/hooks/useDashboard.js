import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { getBookingsAfterDate, getStaysAfterDate } from '../services/apiBookings';

export function useRecentBookings() {
	const [searchParams] = useSearchParams();
	const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { data: bookings, isPending: isBookingsLoading } = useQuery({
		queryKey: ['bookings', `last-${numDays}`],
		queryFn: () => getBookingsAfterDate(queryDate),
	});

	return { bookings, isBookingsLoading };
}

export function useRecentStays() {
	const [searchParams] = useSearchParams();
	const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { data: stays, isPending: isStaysLoading } = useQuery({
		queryKey: ['stays', `last-${numDays}`],
		queryFn: () => getStaysAfterDate(queryDate),
	});

	// it's a list of current or completed stays, we should extract info only for customers who have checked in or checked out.
	const confirmedStays = stays?.filter((stay) => stay.status === 'checked-in' || stay.status === 'checked-out');

	return { stays, confirmedStays, isStaysLoading };
}
