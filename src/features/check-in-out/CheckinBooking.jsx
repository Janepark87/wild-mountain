import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking } from '../../hooks/useBooking';
import { useGoback } from '../../hooks/useGoback';
import { useCheckin } from '../../hooks/useCheckBooking';
import { useSetting } from '../../hooks/useSetting';
import { formatCurrency } from '../../utils/helpers';
import { Row, Heading, Spinner, ButtonGroup, Button, Checkbox, Empty } from '../../components';
import { BookingDetailDataBlock } from '../bookings';

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
	const { settings, isSettingLoading } = useSetting();
	const { updateCheckinMutate, isCheckinUpdating } = useCheckin();
	const goback = useGoback();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

	if (!booking) return <Empty dataName="booking" />;
	if (isBookingLoading || isSettingLoading) return <Spinner />;

	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights, isPaid } = booking;
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
							if (isPaid && addBreakfast) setConfirmPaid(true);
						}}
						disabled={isCheckinUpdating}>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Block>
			)}

			<Block>
				<Checkbox id="confirm" checked={confirmPaid} onChange={() => setConfirmPaid((confirm) => !confirm)} disabled={(confirmPaid && !addBreakfast) || isCheckinUpdating}>
					I confirm that {guests.fullName} has paid the total amount of{' '}
					{!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPriceIncludingBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}{' '}
					{isPaid && !hasBreakfast && addBreakfast && `- Need to extra pay for only breakfast ${formatCurrency(optionalBreakfastPrice)}`}
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
