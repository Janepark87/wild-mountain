import styled from 'styled-components';
import { useTodayCheckInOutActivity } from '../../hooks/useCheckBooking';
import { Heading, Row, Spinner } from '../../components';
import { TodayActivityItem } from './';

const StyledToday = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding: 2.4rem 3.2rem 3.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;

const TodayActiveList = styled.ul`
	overflow: auto;
	overflow-x: hidden;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		width: 0 !important;
	}

	scrollbar-width: none;
	-ms-overflow-style: none;
`;

const NoActivity = styled.p`
	margin-top: 0.8rem;
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
`;

export default function TodayCheckInOutActivity() {
	const { todayActivities, isTodayStaysLoading } = useTodayCheckInOutActivity();

	return (
		<StyledToday>
			<Row type="horizontal">
				<Heading as="h2">Today</Heading>
			</Row>

			{isTodayStaysLoading && <Spinner />}

			{!isTodayStaysLoading && todayActivities?.length > 0 ? (
				<TodayActiveList>
					{todayActivities.map((activity) => (
						<TodayActivityItem key={activity.id} activity={activity} />
					))}
				</TodayActiveList>
			) : (
				<NoActivity>No activity today...</NoActivity>
			)}
		</StyledToday>
	);
}
