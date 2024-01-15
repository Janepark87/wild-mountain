import styled, { keyframes, css } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Loader = styled.div`
	width: 6.4rem;
	margin: 4.8rem auto;
	aspect-ratio: 1;
	border-radius: 50%;
	background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, var(--color-brand-600));
	-webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
	animation: ${rotate} 1.5s infinite linear;
`;

const LoaderMini = styled(BiLoaderAlt)`
	width: 2.4rem;
	animation: ${rotate} 1.5s infinite linear;
`;

export default function Spinner({ size = '' }) {
	return <>{size === 'mini' ? <LoaderMini /> : <Loader />}</>;
}
