import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from 'react-icons/hi2';
import { Dropdown, Modal, ConfirmDelete } from '../../components';
import { useCheckout } from '../../hooks/useCheckBooking';
import { useDeleteBooking } from '../../hooks/useBooking';

export default function BookingRowEllipsisDropdown({ bookingId, status }) {
	const navigate = useNavigate();
	const { updateCheckoutMutate, isCheckoutUpdating } = useCheckout();
	const { deleteBookingMutate, isBookingDeleting } = useDeleteBooking();

	return (
		<Dropdown.Inner>
			<Modal>
				<Dropdown.Trigger id={bookingId} />

				<Dropdown.List id={bookingId}>
					<Dropdown.Item icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
						See details
					</Dropdown.Item>

					{status === 'unconfirmed' && (
						<Dropdown.Item icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check in
						</Dropdown.Item>
					)}

					{status === 'checked-in' && (
						<Dropdown.Item icon={<HiArrowUpOnSquare />} onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
							Check out
						</Dropdown.Item>
					)}

					<Modal.Trigger type="booking-delete-confirmation">
						<Dropdown.Item icon={<HiTrash />} onClick={() => deleteBookingMutate(bookingId)} disabled={isBookingDeleting}>
							Delete
						</Dropdown.Item>
					</Modal.Trigger>
				</Dropdown.List>

				<Modal.Window type="booking-delete-confirmation">
					<ConfirmDelete resource={`Booking #${bookingId}`} disabled={isBookingDeleting} onConfirm={() => deleteBookingMutate(bookingId)} />
				</Modal.Window>
			</Modal>
		</Dropdown.Inner>
	);
}
