import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export async function getBookings({ filters, sortBy, page }) {
	let query = supabase.from('bookings').select('id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, isPaid, cabins(name), guests(fullName, email)', {
		count: 'exact',
	});

	// Filters query.eq('status', 'unconfirmed')
	if (filters.length > 0) {
		filters.forEach((filter) => {
			const { field, value, operator } = filter;
			query = query[operator || 'eq'](field, value);
		});
	}

	// Sort by
	if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

	// Pagination
	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data, count, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookins could not be loaded.');
	}

	return { data, count };
}

export async function getBooking(bookingId) {
	const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', bookingId).maybeSingle();

	if (error) {
		console.log(error);
		throw new Error('Bookins could not get loaded.');
	}

	return data;
}

export async function updateBooking(bookingId, obj) {
	const { data, error } = await supabase.from('bookings').update(obj).eq('id', bookingId).select().single();

	if (error) {
		console.log(error);
		throw new Error('Bookins could not be updated.');
	}

	return data;
}

export async function deleteBooking(bookingId) {
	const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

	if (error) {
		console.error(error);
		throw new Error('Booking could not be deleted.');
	}

	return data;
}

export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from('bookings')
		.select('created_at, totalPrice, extrasPrice')
		.gte('created_at', date)
		.lte('created_at', getToday({ end: true }));

	if (error) {
		console.log(error);
		throw new Error('Bookings could not get loaded.');
	}

	return data;
}

export async function getStaysAfterDate(date) {
	const { data, error } = await supabase.from('bookings').select('*, guests(fullName)').gte('startDate', date).lte('startDate', getToday());

	if (error) {
		console.log(error);
		throw new Error('Bookings could not get loaded.');
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayCheckInOutActivity() {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName, nationality, countryFlag)')
		.or(`and(status.eq.unconfirmed, startDate.eq.${getToday()}), and(status.eq.checked-in, endDate.eq.${getToday()})`)
		.order('created_at');

	if (error) {
		console.log(error);
		throw new Error('Bookings could not get loaded.');
	}

	return data;
}
