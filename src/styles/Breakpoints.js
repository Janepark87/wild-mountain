import { css } from 'styled-components';

const device = {
	xxs: '320px',
	xs: '420px',
	sm: '600px',
	md: '980px',
	lg: '1280px',
	xl: '1440px',
	xxl: '1920px',
};

export const Media = {
	xxs: (...args) => css`
		@media (max-width: ${device.xs}) {
			${css(...args)};
		}
	`,
	xs: (...args) => css`
		@media (max-width: ${device.xs}) {
			${css(...args)};
		}
	`,
	sm: (...args) => css`
		@media (max-width: ${device.sm}) {
			${css(...args)};
		}
	`,
	md: (...args) => css`
		@media (max-width: ${device.md}) {
			${css(...args)};
		}
	`,
	lg: (...args) => css`
		@media (max-width: ${device.lg}) {
			${css(...args)};
		}
	`,
	xl: (...args) => css`
		@media (max-width: ${device.xl}) {
			${css(...args)};
		}
	`,
	xxl: (...args) => css`
		@media (max-width: ${device.xxl}) {
			${css(...args)};
		}
	`,
};
