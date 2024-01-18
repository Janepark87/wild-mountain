import { HiOutlineBriefcase, HiOutlineCash, HiOutlineChartBar, HiOutlineCalendar } from 'react-icons/hi';
import { formatCurrency } from '../../utils/helpers';
import Statistic from './Statistic';

export default function Statistics({ bookings, confirmedStays, numDays, totalCabins }) {
	const numBookings = bookings.length;
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	const totalCheckins = confirmedStays.length; // number of cabin sold

	const checkinTotalNights = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);
	const occupancyRate = Math.round((checkinTotalNights / (numDays * totalCabins)) * 100);

	console.log(checkinTotalNights);

	return (
		<>
			<Statistic title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
			<Statistic title="Sales" color="green" icon={<HiOutlineCash />} value={formatCurrency(sales)} />
			<Statistic title="Check ins" color="indigo" icon={<HiOutlineCalendar />} value={totalCheckins} />
			<Statistic title="Occupancy Rate" color="yellow" icon={<HiOutlineChartBar />} value={`${occupancyRate}%`} />
		</>
	);
}
