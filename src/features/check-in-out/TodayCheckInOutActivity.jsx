import { useTodayCheckInOutActivity } from '../../hooks/useCheckBooking';
import { Heading, Row, Spinner } from '../../components';
import { TodayActivityItem } from './';
import { StyledToday, TodayActiveList, NoActivity } from './styles/TodayCheckInOutActivity.style';

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
