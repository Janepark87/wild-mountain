import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from 'react-icons/hi2';
import { format, isToday } from 'date-fns';
import { useDeleteBooking } from '../../hooks/useBooking';
import { useCheckout } from '../../hooks/useCheckBooking';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { Table, EllipsisDropdown, Badge, Modal, ConfirmDelete } from '../../components';

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
	const { updateCheckoutMutate, isCheckoutUpdating } = useCheckout();
	const { deleteBookingMutate, isBookingDeleting } = useDeleteBooking();

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

			<EllipsisDropdown.Inner>
				<Modal>
					<EllipsisDropdown.Toggle id={bookingId} />

					<EllipsisDropdown.Menu id={bookingId}>
						<EllipsisDropdown.Item icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
							See details
						</EllipsisDropdown.Item>

						{status === 'unconfirmed' && (
							<EllipsisDropdown.Item icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
								Check in
							</EllipsisDropdown.Item>
						)}

						{status === 'checked-in' && (
							<EllipsisDropdown.Item icon={<HiArrowUpOnSquare />} onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
								Check out
							</EllipsisDropdown.Item>
						)}

						<Modal.Trigger type="booking-delete-confirmation">
							<EllipsisDropdown.Item icon={<HiTrash />} onClick={() => deleteBookingMutate(bookingId)} disabled={isBookingDeleting}>
								Delete
							</EllipsisDropdown.Item>
						</Modal.Trigger>
					</EllipsisDropdown.Menu>

					<Modal.Window type="booking-delete-confirmation">
						<ConfirmDelete resource={`Booking #${bookingId}`} disabled={isBookingDeleting} onConfirm={() => deleteBookingMutate(bookingId)} />
					</Modal.Window>
				</Modal>
			</EllipsisDropdown.Inner>
		</Table.Row>
	);
}
