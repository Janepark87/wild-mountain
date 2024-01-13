import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

export async function getBookings({ filters, sortBy, page }) {
	let query = supabase
		.from('bookings')
		.select('id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, isPaid, cabins(name), guests(fullName, email)', {
			count: 'exact',
		});

	// Filters
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
