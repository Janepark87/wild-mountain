import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, Flag, Button } from '../../components';
import { CheckoutButton } from './';

const StyledTodayActivityItem = styled.li`
	display: grid;
	grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
	gap: 1.2rem;
	align-items: center;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);
	font-size: 1.4rem;

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`;

const Guest = styled.div`
	font-weight: 500;
`;

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
			<Badge type={statusBadgeType[status].color}>{statusBadgeType[status].text}</Badge>
			<Flag src={countryFlag} alt={`Flag of ${nationality}`} />
			<Guest>{fullName}</Guest>
			<div>
				{numNights} night{numNights > 1 && 's'}
			</div>
			{status === 'unconfirmed' && (
				<Button size="sm" as={Link} to={`/checkin/${id}`}>
					Check in
				</Button>
			)}
			{status === 'checked-in' && <CheckoutButton size="sm" bookingId={id} />}
		</StyledTodayActivityItem>
	);
}
