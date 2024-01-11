import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import EllipsisDropdown from '../../components/EllipsisDropdown';
import { HiArrowDownOnSquare, HiEllipsisVertical, HiEye } from 'react-icons/hi2';

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
	const navigate = useNavigate();

	const {
		id: bookingId,
		created_at,
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

	console.log(booking);
	console.log(statusBadgeType[isPaid]);

	return (
		<Table.Row role="row">
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{guestEmail}</span>
			</Stacked>

			<Stacked>
				<span>{format(new Date(startDate), 'MMM dd, yyyy')}</span>
				<span>{isToday(new Date(startDate)) ? `${formatDistanceFromNow(startDate)}(today)` : formatDistanceFromNow(startDate)}</span>
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

			<Badge type={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Badge type={statusBadgeType[isPaid]}>{isPaid ? 'Paid' : 'Not yet'}</Badge>

			<EllipsisDropdown>
				<EllipsisDropdown.Toggle id={bookingId}>
					<HiEllipsisVertical />
				</EllipsisDropdown.Toggle>

				<EllipsisDropdown.Menu id={bookingId}>
					<EllipsisDropdown.Item icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
						See details
					</EllipsisDropdown.Item>

					{status === 'unconfirmed' && (
						<EllipsisDropdown.Item icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check in
						</EllipsisDropdown.Item>
					)}
				</EllipsisDropdown.Menu>
			</EllipsisDropdown>
		</Table.Row>
	);
}
