import { useCheckout } from '../../hooks/useCheckBooking';
import { Button } from '../../components';

export default function CheckoutButton({ bookingId }) {
	const { updateCheckoutMutate, isCheckoutUpdating } = useCheckout();

	return (
		<Button size="sm" $width="w-full" onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
			Check out
		</Button>
	);
}
