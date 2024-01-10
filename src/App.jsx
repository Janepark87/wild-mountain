import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

export default function App() {
	return (
		<BrowserRouter basename={import.meta.env.DEV ? '/' : '/the-nature-oasis/'}>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="bookings" element={<Bookings />} />
					<Route path="bookings/:bookingId" element={<Booking />} />
					<Route path="cabins" element={<Cabins />} />
					<Route path="users" element={<Users />} />
					<Route path="settings" element={<Settings />} />
					<Route path="account" element={<Account />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
