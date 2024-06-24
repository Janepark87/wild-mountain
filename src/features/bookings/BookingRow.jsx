import { format, isToday } from 'date-fns';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { Table, Badge } from '../../components';
import { BookingRowEllipsisDropdown } from './';
import { Amount, Cabin, Stacked } from './styles/BookingRow.style';

export default function BookingRow({ booking }) {
	const {
		id: bookingId,
		startDate,
		endDate,
		numNights,
		numGuests,
		totalPrice,
		status,
		isPaid,
		guests: { fullName: guestName, email: guestEmail },
		cabins: { name: cabinName },
	} = booking;

	const statusBadgeType = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
		true: 'green',
		false: 'grey',
	};

	return (
		<Table.Row role="row">
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{guestEmail}</span>
			</Stacked>

			<Stacked>
				<span>{format(new Date(startDate), 'MMM dd, yyyy')}</span>
				<span>{isToday(new Date(startDate)) ? `${formatDistanceFromNow(startDate)} (today)` : formatDistanceFromNow(startDate)}</span>
			</Stacked>

			<span style={{ fontWeight: '500' }}>{format(new Date(endDate), 'MMM dd, yyyy')}</span>

			<Stacked>
				<span>
					{numNights} night{numNights > 1 ? 's' : ''}
				</span>
				<span>
					{numGuests} guest{numGuests > 1 ? 's' : ''}
				</span>
			</Stacked>

			<Badge $variant={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Badge $variant={statusBadgeType[isPaid]}>{isPaid ? 'Paid' : 'Not yet'}</Badge>

			<BookingRowEllipsisDropdown bookingId={bookingId} status={status} />
		</Table.Row>
	);
}
