import Button from '../../components/Button';
import { useCheckout } from '../../hooks/useCheckBooking';

export default function CheckoutButton({ bookingId, size = 'md' }) {
	const { updateCheckoutMutate, isCheckoutUpdating } = useCheckout();

	return (
		<Button size={size} onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
			Check out
		</Button>
	);
}
