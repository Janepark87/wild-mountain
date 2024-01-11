import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking } from '../../hooks/useBooking';
import { useGoback } from '../../hooks/useGoback';
import Row from '../../components/Row';
import Heading from '../../components/Heading';
import Spinner from '../../components/Spinner';
import Badge from '../../components/Badge';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import BookingDetailDataBlock from './BookingDetailDataBlock';

const HeadingGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;
`;

export default function BookingDetail() {
	const navigate = useNavigate();
	const goback = useGoback();
	const { booking, isBookingLoading } = useBooking();
	const { id: bookingId, status } = booking;

	const statusBadgeType = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	if (isBookingLoading) return <Spinner />;
	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Badge type={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>
				</HeadingGroup>
				<Button variation="ghost" onClick={goback}>
					<HiArrowLeft /> Back
				</Button>
			</Row>

			<BookingDetailDataBlock booking={booking} />

			<ButtonGroup>
				{status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
				<Button variation="secondary" onClick={goback}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}
