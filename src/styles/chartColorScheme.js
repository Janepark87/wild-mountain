/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
export const lineChartColorScheme = (isDarkMode) => {
	return isDarkMode
		? {
				totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
				extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
				text: '#e5e7eb',
		  }
		: {
				totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
				extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
				text: '#374151',
		  };
};

export const pieChartStartDataLight = [
	{
		durationLabel: '1 night',
		duration: { from: 1, to: 1 },
		reservations: 0,
		color: '#ef4444',
	},
	{
		durationLabel: '2 nights',
		duration: { from: 2, to: 2 },
		reservations: 0,
		color: '#f97316',
	},
	{
		durationLabel: '3 nights',
		duration: { from: 3, to: 3 },
		reservations: 0,
		color: '#eab308',
	},
	{
		durationLabel: '4-5 nights',
		duration: { from: 4, to: 5 },
		reservations: 0,
		color: '#84cc16',
	},
	{
		durationLabel: '6-7 nights',
		duration: { from: 6, to: 7 },
		reservations: 0,
		color: '#22c55e',
	},
	{
		durationLabel: '8-14 nights',
		duration: { from: 8, to: 14 },
		reservations: 0,
		color: '#14b8a6',
	},
	{
		durationLabel: '15-21 nights',
		duration: { from: 15, to: 21 },
		reservations: 0,
		color: '#3b82f6',
	},
	{
		durationLabel: '21+ nights',
		duration: { from: 21, to: Infinity },
		reservations: 0,
		color: '#a855f7',
	},
];

export const pieChartStartDataDark = [
	{
		durationLabel: '1 night',
		duration: { from: 1, to: 1 },
		reservations: 0,
		color: '#b91c1c',
	},
	{
		durationLabel: '2 nights',
		duration: { from: 2, to: 2 },
		reservations: 0,
		color: '#c2410c',
	},
	{
		durationLabel: '3 nights',
		duration: { from: 3, to: 3 },
		reservations: 0,
		color: '#a16207',
	},
	{
		durationLabel: '4-5 nights',
		duration: { from: 4, to: 5 },
		reservations: 0,
		color: '#4d7c0f',
	},
	{
		durationLabel: '6-7 nights',
		duration: { from: 6, to: 7 },
		reservations: 0,
		color: '#15803d',
	},
	{
		durationLabel: '8-14 nights',
		duration: { from: 8, to: 14 },
		reservations: 0,
		color: '#0f766e',
	},
	{
		durationLabel: '15-21 nights',
		duration: { from: 15, to: 21 },
		reservations: 0,
		color: '#1d4ed8',
	},
	{
		durationLabel: '21+ nights',
		duration: { from: 21, to: Infinity },
		reservations: 0,
		color: '#7e22ce',
	},
];
