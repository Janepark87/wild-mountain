import { format, isToday } from 'date-fns';
import { HiOutlineChatBubbleBottomCenterText, HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineHomeModern } from 'react-icons/hi2';
import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';
import { Flag, DataItem } from '../../components';
import { DataContent, Footer, Guest, Header, Price, StyledDataContainer } from './styles/BookingDetailDataBlock.style';

export default function BookingDetailDataBlock({ booking }) {
	const {
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		cabinPrice,
		extrasPrice,
		totalPrice,
		hasBreakfast,
		observations,
		isPaid,
		guests: { fullName: guestName, email, country, countryFlag, nationalID },
		cabins: { name: cabinName },
	} = booking;

	return (
		<StyledDataContainer>
			<Header>
				<div>
					<HiOutlineHomeModern />
					<p>
						{numNights} nights in Cabin <span>{cabinName}</span>
					</p>
				</div>

				<small>
					{format(new Date(startDate), 'EEE, MMM dd yyyy')} ({isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)}) &mdash;{' '}
					{format(new Date(endDate), 'EEE, MMM dd yyyy')}
				</small>
			</Header>

			<DataContent>
				<Guest>
					<div>
						{countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
						<p>
							<span>{guestName}</span>
							<span>{numGuests > 1 ? ` + ${numGuests - 1} guests` : ''}</span>
						</p>
					</div>
					<div>
						<p>{email}</p>
						<span>&bull;</span>
						<p>National ID {nationalID}</p>
					</div>
				</Guest>

				{observations && (
					<DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Observations">
						{observations}
					</DataItem>
				)}

				<DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
					{hasBreakfast ? 'Yes' : 'No'}
				</DataItem>

				<Price $isPaid={isPaid}>
					<DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
						<span>{formatCurrency(totalPrice)}</span>
						{hasBreakfast && ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
					</DataItem>

					<p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
				</Price>
			</DataContent>

			<Footer>
				<p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
			</Footer>
		</StyledDataContainer>
	);
}
