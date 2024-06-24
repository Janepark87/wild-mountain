import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking, useDeleteBooking } from '../../hooks/useBooking';
import { useGoback } from '../../hooks/useGoback';
import { Row, Heading, Spinner, Badge, ButtonGroup, Button, Modal, ConfirmDelete, Empty } from '../../components';
import { BookingDetailDataBlock } from './';
import { CheckoutButton } from '../check-in-out';

const HeadingGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;
`;

export default function BookingDetail() {
	const navigate = useNavigate();
	const { booking, isBookingLoading } = useBooking();
	const { deleteBookingMutate, isBookingDeleting } = useDeleteBooking();
	const goback = useGoback();

	if (!booking && !isBookingLoading) return <Empty dataName="booking" />;
	if (isBookingLoading) return <Spinner />;

	const { id: bookingId, status } = booking;
	const statusBadgeType = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Badge $variant={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>
				</HeadingGroup>
				<Button variation="ghost" onClick={goback}>
					<HiArrowLeft /> Back
				</Button>
			</Row>

			<BookingDetailDataBlock booking={booking} />

			<ButtonGroup>
				<Modal>
					<Modal.Trigger name="booking-detail-delete-confirmation">
						<Button variation="danger">Delete Booking</Button>
					</Modal.Trigger>

					<Modal.Window name="booking-detail-delete-confirmation">
						<ConfirmDelete
							resource={`Booking #${bookingId}`}
							disabled={isBookingDeleting}
							onConfirm={() =>
								deleteBookingMutate(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				{status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

				{status === 'checked-in' && <CheckoutButton bookingId={bookingId} />}

				<Button variation="secondary" onClick={goback}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}
