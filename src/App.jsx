import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout, ProtectedRoute } from './layouts';
import { Account, Booking, Bookings, Cabins, Checkin, Dashboard, Login, PageNotFound, Settings, Users } from './pages';

export default function App() {
	return (
		<BrowserRouter basename={import.meta.env.DEV ? '/' : '/wild-mountain/'}>
			<Routes>
				<Route
					element={
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}>
					<Route index element={<Navigate to='dashboard' replace />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='bookings' element={<Bookings />} />
					<Route path='bookings/:bookingId' element={<Booking />} />
					<Route path='checkin/:bookingId' element={<Checkin />} />
					<Route path='cabins' element={<Cabins />} />
					<Route path='users' element={<Users />} />
					<Route path='settings' element={<Settings />} />
					<Route path='account' element={<Account />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
