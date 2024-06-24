import { Link } from 'react-router-dom';
import { Badge, Flag, Button } from '../../components';
import { CheckoutButton } from './';
import { StyledTodayActivityItem, Guest } from './styles/TodayActivityItem.style';

export default function TodayActivityItem({ activity }) {
	const {
		id,
		status,
		guests: { fullName, countryFlag, nationality },
		numNights,
	} = activity;

	const statusBadgeType = {
		unconfirmed: { color: 'green', text: 'Arriving' },
		'checked-in': { color: 'blue', text: 'Departing' },
	};

	return (
		<StyledTodayActivityItem>
			<Badge $variant={statusBadgeType[status].color}>{statusBadgeType[status].text}</Badge>

			<Flag src={countryFlag} alt={`Flag of ${nationality}`} />

			<Guest>{fullName}</Guest>

			<div>
				{numNights} night{numNights > 1 && 's'}
			</div>

			{status === 'unconfirmed' && (
				<Button size="sm" $width="w-full" as={Link} to={`/checkin/${id}`}>
					Check in
				</Button>
			)}
			{status === 'checked-in' && <CheckoutButton bookingId={id} />}
		</StyledTodayActivityItem>
	);
}
