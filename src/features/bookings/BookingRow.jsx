import styled from 'styled-components';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import Table from '../../components/Table';
import Badge from '../../components/Badge';

const Cabin = styled.div`
	color: var(--color-grey-600);
	font-family: 'Sono';
	font-size: 1.6rem;
	font-weight: 600;
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

export default function BookingRow({ booking }) {
	const {
		id: bookingId,
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		totalPrice,
		status,
		guests: { fullName: guestName, email: guestEmail },
		cabins: { name: cabinName },
	} = booking;

	const statusBadgeType = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<Table.Row role="row">
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{guestEmail}</span>
			</Stacked>

			<span>{format(new Date(startDate), 'MMM dd, yyyy')}</span>
			<span>{format(new Date(endDate), 'MMM dd, yyyy')}</span>

			<Stacked>
				<span>
					{numNights} night{numNights > 1 ? 's' : ''}
				</span>
				<span>
					{numGuests} guest{numGuests > 1 ? 's' : ''}
				</span>
			</Stacked>

			<Badge type={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>

			<Amount>{formatCurrency(totalPrice)}</Amount>
		</Table.Row>
	);
}
