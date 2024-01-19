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
