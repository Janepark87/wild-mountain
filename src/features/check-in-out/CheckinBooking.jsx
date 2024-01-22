import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking } from '../../hooks/useBooking';
import { useGoback } from '../../hooks/useGoback';
import { useCheckin } from '../../hooks/useCheckBooking';
import { useSettingQuery } from '../../hooks/useSetting';
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
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking, isBookingLoading } = useBooking();
	const { settings, isSettingLoading } = useSettingQuery();
	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
	const { updateCheckinMutate, isCheckinUpdating } = useCheckin();
	const goback = useGoback();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);

	if (isBookingLoading || isSettingLoading) return <Spinner />;

	const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
	const totalPriceIncludingBreakfast = totalPrice + optionalBreakfastPrice;

	const handleCheckin = () => {
		if (!confirmPaid) return;

		if (addBreakfast) {
			updateCheckinMutate({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPriceIncludingBreakfast,
				},
			});
		} else updateCheckinMutate({ bookingId, breakfast: {} });
	};

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<Button variation="ghost" onClick={goback}>
					<HiArrowLeft /> Back
				</Button>
			</Row>

			<BookingDetailDataBlock booking={booking} />

			{!hasBreakfast && (
				<Block>
					<Checkbox
						id="breakfast"
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((breakfast) => !breakfast);
							setConfirmPaid(false);
						}}
						disabled={isCheckinUpdating}>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Block>
			)}

			<Block>
				<Checkbox id="confirm" checked={confirmPaid} onChange={() => setConfirmPaid((confirm) => !confirm)} disabled={confirmPaid || isCheckinUpdating}>
					I confirm that {guests.fullName} has paid the total amount of{' '}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(totalPriceIncludingBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(totalPriceIncludingBreakfast)})`}
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
