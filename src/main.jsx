import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles.js';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { NavigationProvider } from './context/NavigationContext.jsx';
import { ErrorFallback } from './components';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DarkModeProvider>
			<NavigationProvider>
				<QueryClientProvider client={queryClient}>
					{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
					<GlobalStyles />

					<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
						<App />
					</ErrorBoundary>

					<Toaster
						position="top-right"
						reverseOrder={true}
						getter={12}
						containerStyle={{ margin: '8px' }}
						toastOptions={{
							suceess: { duration: 3000 },
							error: { duration: 4000 },
							style: {
								fontSize: '16px',
								maxWidth: '500px',
								padding: '16px 24px',
								backgroundColor: 'var(--color-grey-0)',
								color: 'var(--color-grey-700)',
							},
						}}
					/>
				</QueryClientProvider>
			</NavigationProvider>
		</DarkModeProvider>
	</React.StrictMode>
);
