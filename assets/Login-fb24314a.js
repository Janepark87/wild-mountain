import{r,aa as g,j as e,$ as p,a0 as o,a1 as d,c as h,S as c,p as j,a7 as f,ab as u,ac as w,H as v,s as L}from"./index-bf703710.js";function b(){const[a,s]=r.useState("master@wildmountain.com"),[t,l]=r.useState("green2025"),{loginMutate:m,isLoginLoading:i}=g(),x=n=>{n.preventDefault(),!(!a||!t)&&m({email:a,password:t},{onSettled:()=>{s(""),l("")}})};return e.jsxs(p,{onSubmit:x,children:[e.jsx(o,{label:"Email",orientation:"vertical",children:e.jsx(d,{type:"email",id:"email",autoComplete:"username",value:a,onChange:n=>s(n.target.value),disabled:i})}),e.jsx(o,{label:"Password",orientation:"vertical",children:e.jsx(d,{type:"password",id:"password",autoComplete:"current-password",value:t,onChange:n=>l(n.target.value),disabled:i})}),e.jsx(o,{orientation:"vertical",children:e.jsxs(h,{size:"lg",$width:"w-full",disabled:i,children:["Log in ",i&&e.jsx(c,{type:"mini"})]})})]})}const S=L.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 44rem;
	gap: 3.2rem;
	padding: 2rem;
`;function E(){const a=j(),{isUserLoading:s,isAuthenticated:t}=f();return r.useEffect(()=>{t&&!s&&a("/")},[t,s,a]),s?e.jsxs(u,{children:[e.jsx(c,{}),";"]}):e.jsx(u,{children:e.jsxs(S,{children:[e.jsx(w,{}),e.jsx(v,{as:"h1",className:"text-center",children:"Log in to your account"}),e.jsx(b,{})]})})}export{E as default};
