import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking } from '../../hooks/useBooking';
import { useGoback } from '../../hooks/useGoback';
import { useUpdatingCheckin } from '../../hooks/useCheckin';
import { formatCurrency } from '../../utils/helpers';
import Row from '../../components/Row';
import Heading from '../../components/Heading';
import Spinner from '../../components/Spinner';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import BookingDetailDataBlock from '../../features/bookings/BookingDetailDataBlock';
import Checkbox from '../../components/Checkbox';

const Block = styled.div`
	padding: 2.4rem 4rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

export default function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const { booking, isBookingLoading } = useBooking();
	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
	const goback = useGoback();
	const { updateCheckinMutate, isCheckinUpdating } = useUpdatingCheckin();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);

	const handleCheckin = () => {
		if (!confirmPaid) return;

		updateCheckinMutate(bookingId);
	};

	if (isBookingLoading) return <Spinner />;
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<Button variation="ghost" onClick={goback}>
					<HiArrowLeft /> Back
				</Button>
			</Row>

			<BookingDetailDataBlock booking={booking} />

			<Block>
				<Checkbox id="confirm" checked={confirmPaid} onChange={() => setConfirmPaid((confirm) => !confirm)} disabled={confirmPaid || isCheckinUpdating}>
					I confirm that {guests.fullName} has paid the total amount of {formatCurrency(totalPrice)}
				</Checkbox>
			</Block>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinUpdating}>
					Check in booking
				</Button>
				<Button variation="secondary" onClick={goback}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}
