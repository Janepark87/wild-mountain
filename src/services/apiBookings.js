import supabase from './supabase';

export async function getBookings(filters, sortBy) {
	let query = supabase
		.from('bookings')
		.select('id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)');

	// Filters
	if (filters.length > 0) {
		filters.forEach((filter) => {
			const { field, value, operator } = filter;
			query = query[operator || 'eq'](field, value);
		});
	}

	// Sort by
	if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookins could not be loaded.');
	}

	return data;
}
