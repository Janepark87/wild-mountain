import { useCheckout } from '../../hooks/useCheckBooking';
import { Button } from '../../components';

export default function CheckoutButton({ bookingId, size = 'md' }) {
	const { updateCheckoutMutate, isCheckoutUpdating } = useCheckout();

	return (
		<Button size={size} onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
			Check out
		</Button>
	);
}
