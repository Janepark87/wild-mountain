import{p as t,j as r,H as n,c as a,s as e}from"./index-7869a08a.js";const i=e.main`
	width: 100%;
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`,d=e.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3rem;
	flex: 0 1 96rem;
	max-width: 55rem;
	padding: 4.8rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	& p {
		max-width: 28rem;
		text-align: center;
		color: var(--color-grey-500);
		font-family: 'Sono';
	}

	& button {
		margin-top: 1.6rem;
	}
`;function c(){const o=t();return r.jsx(i,{children:r.jsxs(d,{children:[r.jsx(n,{as:"h1",children:"404 - Oops!"}),r.jsx("p",{children:"We could not find the page you were looking for 🧐"}),r.jsx(a,{size:"md",onClick:()=>o("/"),children:"Back to Dashboard"})]})})}export{c as default};
