import supabase from './supabase';

export async function getBookings(filters) {
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

	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookins could not be loaded.');
	}

	return data;
}
