import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './layouts';
import { Spinner } from './components';

const AppLayout = lazy(() => import('./layouts/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Booking = lazy(() => import('./pages/Booking'));
const Checkin = lazy(() => import('./pages/Checkin'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Settings = lazy(() => import('./pages/Settings'));
const Account = lazy(() => import('./pages/Account'));
const Users = lazy(() => import('./pages/Users'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

export default function App() {
	return (
		<BrowserRouter basename={import.meta.env.DEV ? '/' : '/wild-mountain/'}>
			<Suspense fallback={<Spinner type="full-screen" />}>
				<Routes>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}>
						<Route index element={<Navigate to="dashboard" replace />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="bookings/:bookingId" element={<Booking />} />
						<Route path="checkin/:bookingId" element={<Checkin />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<Users />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
