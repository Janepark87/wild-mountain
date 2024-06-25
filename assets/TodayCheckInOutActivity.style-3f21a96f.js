import{t as D,z as C,A as E,E as R,G as $,u as we,b as A,I as ke,J as X,_ as S,p as U,s as m,j as i,K as re,S as ae,R as oe,H as ie,B as be,c as j,N as se,O as ce,M as G,y as xe,Q as T,U as pe,F as De,V as Q,W as Oe,X as ve,Y as Pe,r as I,Z as z}from"./index-7869a08a.js";import{u as je}from"./useSetting-afa3e0e6.js";import{g as H,b as K,m as Be,c as de,e as Ce,d as N,a as Ee,f as O}from"./helpers-f733994b.js";function q(n,e){var c,u,g,l;const t=H(),r=(e==null?void 0:e.weekStartsOn)??((u=(c=e==null?void 0:e.locale)==null?void 0:c.options)==null?void 0:u.weekStartsOn)??t.weekStartsOn??((l=(g=t.locale)==null?void 0:g.options)==null?void 0:l.weekStartsOn)??0,a=D(n),o=a.getDay(),d=(o<r?7:0)+o-r;return a.setDate(a.getDate()-d),a.setHours(0,0,0,0),a}function W(n){return q(n,{weekStartsOn:1})}function ue(n){const e=D(n),t=e.getFullYear(),r=C(n,0);r.setFullYear(t+1,0,4),r.setHours(0,0,0,0);const a=W(r),o=C(n,0);o.setFullYear(t,0,4),o.setHours(0,0,0,0);const d=W(o);return e.getTime()>=a.getTime()?t+1:e.getTime()>=d.getTime()?t:t-1}function F(n){const e=D(n);return e.setHours(0,0,0,0),e}function Me(n,e){const t=F(n),r=F(e),a=t.getTime()-K(t),o=r.getTime()-K(r);return Math.round((a-o)/Be)}function Ye(n){const e=ue(n),t=C(n,0);return t.setFullYear(e,0,4),t.setHours(0,0,0,0),W(t)}function Se(n,e){const t=F(n),r=F(e);return+t==+r}function Te(n){return n instanceof Date||typeof n=="object"&&Object.prototype.toString.call(n)==="[object Date]"}function qe(n){if(!Te(n)&&typeof n!="number")return!1;const e=D(n);return!isNaN(Number(e))}function Ne(n){const e=D(n),t=C(n,0);return t.setFullYear(e.getFullYear(),0,1),t.setHours(0,0,0,0),t}function We(n){const e=D(n);return Me(e,Ne(e))+1}function Fe(n){const e=D(n),t=W(e).getTime()-Ye(e).getTime();return Math.round(t/de)+1}function le(n,e){var l,y,k,w;const t=D(n),r=t.getFullYear(),a=H(),o=(e==null?void 0:e.firstWeekContainsDate)??((y=(l=e==null?void 0:e.locale)==null?void 0:l.options)==null?void 0:y.firstWeekContainsDate)??a.firstWeekContainsDate??((w=(k=a.locale)==null?void 0:k.options)==null?void 0:w.firstWeekContainsDate)??1,d=C(n,0);d.setFullYear(r+1,0,o),d.setHours(0,0,0,0);const c=q(d,e),u=C(n,0);u.setFullYear(r,0,o),u.setHours(0,0,0,0);const g=q(u,e);return t.getTime()>=c.getTime()?r+1:t.getTime()>=g.getTime()?r:r-1}function $e(n,e){var c,u,g,l;const t=H(),r=(e==null?void 0:e.firstWeekContainsDate)??((u=(c=e==null?void 0:e.locale)==null?void 0:c.options)==null?void 0:u.firstWeekContainsDate)??t.firstWeekContainsDate??((l=(g=t.locale)==null?void 0:g.options)==null?void 0:l.firstWeekContainsDate)??1,a=le(n,e),o=C(n,0);return o.setFullYear(a,0,r),o.setHours(0,0,0,0),q(o,e)}function He(n,e){const t=D(n),r=q(t,e).getTime()-$e(t,e).getTime();return Math.round(r/de)+1}function s(n,e){const t=n<0?"-":"",r=Math.abs(n).toString().padStart(e,"0");return t+r}const P={y(n,e){const t=n.getFullYear(),r=t>0?t:1-t;return s(e==="yy"?r%100:r,e.length)},M(n,e){const t=n.getMonth();return e==="M"?String(t+1):s(t+1,2)},d(n,e){return s(n.getDate(),e.length)},a(n,e){const t=n.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return t.toUpperCase();case"aaa":return t;case"aaaaa":return t[0];case"aaaa":default:return t==="am"?"a.m.":"p.m."}},h(n,e){return s(n.getHours()%12||12,e.length)},H(n,e){return s(n.getHours(),e.length)},m(n,e){return s(n.getMinutes(),e.length)},s(n,e){return s(n.getSeconds(),e.length)},S(n,e){const t=e.length,r=n.getMilliseconds(),a=Math.floor(r*Math.pow(10,t-3));return s(a,e.length)}},Y={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},_e={G:function(n,e,t){const r=n.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return t.era(r,{width:"abbreviated"});case"GGGGG":return t.era(r,{width:"narrow"});case"GGGG":default:return t.era(r,{width:"wide"})}},y:function(n,e,t){if(e==="yo"){const r=n.getFullYear(),a=r>0?r:1-r;return t.ordinalNumber(a,{unit:"year"})}return P.y(n,e)},Y:function(n,e,t,r){const a=le(n,r),o=a>0?a:1-a;if(e==="YY"){const d=o%100;return s(d,2)}return e==="Yo"?t.ordinalNumber(o,{unit:"year"}):s(o,e.length)},R:function(n,e){const t=ue(n);return s(t,e.length)},u:function(n,e){const t=n.getFullYear();return s(t,e.length)},Q:function(n,e,t){const r=Math.ceil((n.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return s(r,2);case"Qo":return t.ordinalNumber(r,{unit:"quarter"});case"QQQ":return t.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return t.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return t.quarter(r,{width:"wide",context:"formatting"})}},q:function(n,e,t){const r=Math.ceil((n.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return s(r,2);case"qo":return t.ordinalNumber(r,{unit:"quarter"});case"qqq":return t.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return t.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return t.quarter(r,{width:"wide",context:"standalone"})}},M:function(n,e,t){const r=n.getMonth();switch(e){case"M":case"MM":return P.M(n,e);case"Mo":return t.ordinalNumber(r+1,{unit:"month"});case"MMM":return t.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return t.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return t.month(r,{width:"wide",context:"formatting"})}},L:function(n,e,t){const r=n.getMonth();switch(e){case"L":return String(r+1);case"LL":return s(r+1,2);case"Lo":return t.ordinalNumber(r+1,{unit:"month"});case"LLL":return t.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return t.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return t.month(r,{width:"wide",context:"standalone"})}},w:function(n,e,t,r){const a=He(n,r);return e==="wo"?t.ordinalNumber(a,{unit:"week"}):s(a,e.length)},I:function(n,e,t){const r=Fe(n);return e==="Io"?t.ordinalNumber(r,{unit:"week"}):s(r,e.length)},d:function(n,e,t){return e==="do"?t.ordinalNumber(n.getDate(),{unit:"date"}):P.d(n,e)},D:function(n,e,t){const r=We(n);return e==="Do"?t.ordinalNumber(r,{unit:"dayOfYear"}):s(r,e.length)},E:function(n,e,t){const r=n.getDay();switch(e){case"E":case"EE":case"EEE":return t.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return t.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return t.day(r,{width:"short",context:"formatting"});case"EEEE":default:return t.day(r,{width:"wide",context:"formatting"})}},e:function(n,e,t,r){const a=n.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return s(o,2);case"eo":return t.ordinalNumber(o,{unit:"day"});case"eee":return t.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return t.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return t.day(a,{width:"short",context:"formatting"});case"eeee":default:return t.day(a,{width:"wide",context:"formatting"})}},c:function(n,e,t,r){const a=n.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return s(o,e.length);case"co":return t.ordinalNumber(o,{unit:"day"});case"ccc":return t.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return t.day(a,{width:"narrow",context:"standalone"});case"cccccc":return t.day(a,{width:"short",context:"standalone"});case"cccc":default:return t.day(a,{width:"wide",context:"standalone"})}},i:function(n,e,t){const r=n.getDay(),a=r===0?7:r;switch(e){case"i":return String(a);case"ii":return s(a,e.length);case"io":return t.ordinalNumber(a,{unit:"day"});case"iii":return t.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return t.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return t.day(r,{width:"short",context:"formatting"});case"iiii":default:return t.day(r,{width:"wide",context:"formatting"})}},a:function(n,e,t){const a=n.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(n,e,t){const r=n.getHours();let a;switch(r===12?a=Y.noon:r===0?a=Y.midnight:a=r/12>=1?"pm":"am",e){case"b":case"bb":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(n,e,t){const r=n.getHours();let a;switch(r>=17?a=Y.evening:r>=12?a=Y.afternoon:r>=4?a=Y.morning:a=Y.night,e){case"B":case"BB":case"BBB":return t.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return t.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return t.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(n,e,t){if(e==="ho"){let r=n.getHours()%12;return r===0&&(r=12),t.ordinalNumber(r,{unit:"hour"})}return P.h(n,e)},H:function(n,e,t){return e==="Ho"?t.ordinalNumber(n.getHours(),{unit:"hour"}):P.H(n,e)},K:function(n,e,t){const r=n.getHours()%12;return e==="Ko"?t.ordinalNumber(r,{unit:"hour"}):s(r,e.length)},k:function(n,e,t){let r=n.getHours();return r===0&&(r=24),e==="ko"?t.ordinalNumber(r,{unit:"hour"}):s(r,e.length)},m:function(n,e,t){return e==="mo"?t.ordinalNumber(n.getMinutes(),{unit:"minute"}):P.m(n,e)},s:function(n,e,t){return e==="so"?t.ordinalNumber(n.getSeconds(),{unit:"second"}):P.s(n,e)},S:function(n,e){return P.S(n,e)},X:function(n,e,t,r){const o=(r._originalDate||n).getTimezoneOffset();if(o===0)return"Z";switch(e){case"X":return Z(o);case"XXXX":case"XX":return B(o);case"XXXXX":case"XXX":default:return B(o,":")}},x:function(n,e,t,r){const o=(r._originalDate||n).getTimezoneOffset();switch(e){case"x":return Z(o);case"xxxx":case"xx":return B(o);case"xxxxx":case"xxx":default:return B(o,":")}},O:function(n,e,t,r){const o=(r._originalDate||n).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+V(o,":");case"OOOO":default:return"GMT"+B(o,":")}},z:function(n,e,t,r){const o=(r._originalDate||n).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+V(o,":");case"zzzz":default:return"GMT"+B(o,":")}},t:function(n,e,t,r){const a=r._originalDate||n,o=Math.floor(a.getTime()/1e3);return s(o,e.length)},T:function(n,e,t,r){const o=(r._originalDate||n).getTime();return s(o,e.length)}};function V(n,e=""){const t=n>0?"-":"+",r=Math.abs(n),a=Math.floor(r/60),o=r%60;return o===0?t+String(a):t+String(a)+e+s(o,2)}function Z(n,e){return n%60===0?(n>0?"-":"+")+s(Math.abs(n)/60,2):B(n,e)}function B(n,e=""){const t=n>0?"-":"+",r=Math.abs(n),a=s(Math.floor(r/60),2),o=s(r%60,2);return t+a+e+o}const J=(n,e)=>{switch(n){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},fe=(n,e)=>{switch(n){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Ge=(n,e)=>{const t=n.match(/(P+)(p+)?/)||[],r=t[1],a=t[2];if(!a)return J(n,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;case"PPPP":default:o=e.dateTime({width:"full"});break}return o.replace("{{date}}",J(r,e)).replace("{{time}}",fe(a,e))},Qe={p:fe,P:Ge},Ie=["D","DD"],Le=["YY","YYYY"];function Re(n){return Ie.indexOf(n)!==-1}function Ae(n){return Le.indexOf(n)!==-1}function ee(n,e,t){if(n==="YYYY")throw new RangeError(`Use \`yyyy\` instead of \`YYYY\` (in \`${e}\`) for formatting years to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(n==="YY")throw new RangeError(`Use \`yy\` instead of \`YY\` (in \`${e}\`) for formatting years to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(n==="D")throw new RangeError(`Use \`d\` instead of \`D\` (in \`${e}\`) for formatting days of the month to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(n==="DD")throw new RangeError(`Use \`dd\` instead of \`DD\` (in \`${e}\`) for formatting days of the month to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`)}const Xe=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ue=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ze=/^'([^]*?)'?$/,Ke=/''/g,Ve=/[a-zA-Z]/;function L(n,e,t){var l,y,k,w,v,x,b,h;const r=H(),a=(t==null?void 0:t.locale)??r.locale??Ce,o=(t==null?void 0:t.firstWeekContainsDate)??((y=(l=t==null?void 0:t.locale)==null?void 0:l.options)==null?void 0:y.firstWeekContainsDate)??r.firstWeekContainsDate??((w=(k=r.locale)==null?void 0:k.options)==null?void 0:w.firstWeekContainsDate)??1,d=(t==null?void 0:t.weekStartsOn)??((x=(v=t==null?void 0:t.locale)==null?void 0:v.options)==null?void 0:x.weekStartsOn)??r.weekStartsOn??((h=(b=r.locale)==null?void 0:b.options)==null?void 0:h.weekStartsOn)??0,c=D(n);if(!qe(c))throw new RangeError("Invalid time value");const u={firstWeekContainsDate:o,weekStartsOn:d,locale:a,_originalDate:c};return e.match(Ue).map(function(f){const p=f[0];if(p==="p"||p==="P"){const M=Qe[p];return M(f,a.formatLong)}return f}).join("").match(Xe).map(function(f){if(f==="''")return"'";const p=f[0];if(p==="'")return Ze(f);const M=_e[p];if(M)return!(t!=null&&t.useAdditionalWeekYearTokens)&&Ae(f)&&ee(f,e,String(n)),!(t!=null&&t.useAdditionalDayOfYearTokens)&&Re(f)&&ee(f,e,String(n)),M(c,f,a.localize,u);if(p.match(Ve))throw new RangeError("Format string contains an unescaped latin alphabet character `"+p+"`");return f}).join("")}function Ze(n){const e=n.match(ze);return e?e[1].replace(Ke,"'"):n}function Je(n){return Se(n,Date.now())}async function te({filters:n,sortBy:e,page:t}){let r=E.from("bookings").select("id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, isPaid, cabins(name), guests(fullName, email)",{count:"exact"});if(n.length>0&&n.forEach(c=>{const{field:u,value:g,operator:l}=c;r=r[l||"eq"](u,g)}),e&&(r=r.order(e.field,{ascending:e.direction==="asc"})),t){const c=(t-1)*R,u=c+R-1;r=r.range(c,u)}const{data:a,count:o,error:d}=await r;if(d)throw console.error(d),new Error("Bookins could not be loaded.");return{data:a,count:o}}async function et(n){const{data:e,error:t}=await E.from("bookings").select("*, cabins(*), guests(*)").eq("id",n).maybeSingle();if(t)throw console.log(t),new Error("Bookins could not get loaded.");return e}async function ge(n,e){const{data:t,error:r}=await E.from("bookings").update(e).eq("id",n).select().single();if(r)throw console.log(r),new Error("Bookins could not be updated.");return t}async function tt(n){const{data:e,error:t}=await E.from("bookings").delete().eq("id",n);if(t)throw console.error(t),new Error("Booking could not be deleted.");return e}async function wt(n){const{data:e,error:t}=await E.from("bookings").select("created_at, totalPrice, extrasPrice").gte("created_at",n).lte("created_at",N({end:!0}));if(t)throw console.log(t),new Error("Bookings could not get loaded.");return e}async function kt(n){const{data:e,error:t}=await E.from("bookings").select("*, guests(fullName)").gte("startDate",n).lte("startDate",N());if(t)throw console.log(t),new Error("Bookings could not get loaded.");return e}async function nt(){const{data:n,error:e}=await E.from("bookings").select("*, guests(fullName, nationality, countryFlag)").or(`and(status.eq.unconfirmed, startDate.eq.${N()}), and(status.eq.checked-in, endDate.eq.${N()})`).order("created_at");if(e)throw console.log(e),new Error("Bookings could not get loaded.");return n}function bt(){const n=$(),[e]=we(),t=["status","numNights","totalPrice"],r={status:"eq",numNights:"lte",totalPrice:"gte"},a=t.map(b=>{const h=e.get(b);if(h&&h!=="all"){const f=r[b]||"eq";return{field:b,value:h,operator:f}}}).filter(Boolean),o=e.get("sortBy")||"startDate-desc",[d,c]=o.split("-"),u={field:d,direction:c},g=e.get("page"),l=g?Number(g):1,{data:{data:y,count:k}={},isPending:w,isError:v}=A({queryKey:["bookings",a,u,l],queryFn:()=>te({filters:a,sortBy:u,page:l})}),x=b=>{const h=l+b,f=Math.ceil(k/R);h>=1&&h<=f&&n.prefetchQuery({queryKey:["bookings",a,u,h],queryFn:()=>te({filters:a,sortBy:u,page:h})})};return x(1),x(-1),{bookings:y,count:k,isBookingLoading:w,isBookingError:v}}function he(){const{bookingId:n}=ke(),{data:e,isPending:t,isError:r}=A({queryKey:["bookings",n],queryFn:()=>et(n),retry:!1});return{booking:e,isBookingLoading:t,isBookingError:r}}function rt(){const n=$(),{mutate:e,isPending:t}=X({mutationFn:tt,onSuccess:()=>{S.success("Booking succesfully deleted"),n.invalidateQueries({queryKey:["bookings"]})},onError:r=>S.error(r.message)});return{deleteBookingMutate:e,isBookingDeleting:t}}function me(){const n=U();return()=>n(-1)}const at=()=>{const n=$(),e=U(),{mutate:t,isPending:r}=X({mutationFn:({bookingId:a,breakfast:o})=>ge(a,{status:"checked-in",isPaid:!0,...o}),onSuccess:a=>{S.success(`Booking #${a.id} succesfully checked in.`),n.invalidateQueries({active:!0}),e("/")},onError:a=>S.error("There was an error while checking in: "+a.message)});return{updateCheckinMutate:t,isCheckinUpdating:r}},ot=()=>{const n=$(),{mutate:e,isPending:t}=X({mutationFn:r=>ge(r,{status:"checked-out"}),onSuccess:r=>{S.success(`Booking #${r.id} succesfully checked out.`),n.invalidateQueries({active:!0})},onError:r=>S.error("There was an error while checking out: "+r.message)});return{updateCheckoutMutate:e,isCheckoutUpdating:t}};function xt(){const{data:n,isPending:e}=A({queryFn:nt,queryKey:["today-check-in-out-activity"]});return{todayActivities:n,isTodayStaysLoading:e}}const pt=m.div`
	color: var(--color-grey-600);
	font-family: 'Sono';
	font-size: 1.6rem;
	font-weight: 600;
`,Dt=m.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`,Ot=m.div`
	font-family: 'Sono';
	font-weight: 500;
`,it=m.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;
`;function vt(){const n=U(),{booking:e,isBookingLoading:t}=he(),{deleteBookingMutate:r,isBookingDeleting:a}=rt(),o=me();if(!e&&!t)return i.jsx(re,{dataName:"booking"});if(t)return i.jsx(ae,{});const{id:d,status:c}=e,u={unconfirmed:"blue","checked-in":"green","checked-out":"silver"};return i.jsxs(i.Fragment,{children:[i.jsxs(oe,{type:"horizontal",children:[i.jsxs(it,{children:[i.jsxs(ie,{as:"h1",children:["Booking #",d]}),i.jsx(be,{$variant:u[c],children:c.replace("-"," ")})]}),i.jsxs(j,{variation:"ghost",onClick:o,children:[i.jsx(se,{})," Back"]})]}),i.jsx(ye,{booking:e}),i.jsxs(ce,{children:[i.jsxs(G,{children:[i.jsx(G.Trigger,{name:"booking-detail-delete-confirmation",children:i.jsx(j,{variation:"danger",children:"Delete Booking"})}),i.jsx(G.Window,{name:"booking-detail-delete-confirmation",children:i.jsx(xe,{resource:`Booking #${d}`,disabled:a,onConfirm:()=>r(d,{onSettled:()=>n(-1)})})})]}),c==="unconfirmed"&&i.jsx(j,{onClick:()=>n(`/checkin/${d}`),children:"Check in"}),c==="checked-in"&&i.jsx(gt,{bookingId:d}),i.jsx(j,{variation:"secondary",onClick:o,children:"Back"})]})]})}const st=m.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	overflow: hidden;
`,ct=m.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 3rem;
	color: #e0e7ff;
	background-color: var(--color-brand-500);
	font-size: 1.8rem;
	font-weight: 500;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& > div:first-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-size: 1.8rem;
		font-weight: 600;
	}

	& p span {
		margin-left: 4px;
		font-family: 'Sono';
		font-size: 2rem;
	}

	${T.lg`
		padding: 1.75rem 2rem;
		font-size: 1.6rem;

		svg {
			height: 2.5rem;
			width: 2.5rem;
		}	

		& > div:first-child {
			font-size: 1.6rem;
		}

	`}
`,dt=m.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	padding: 3.2rem 3.5rem;
`,ut=m.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
	color: var(--color-grey-500);

	${T.lg`
		&, & > div:first-of-type{
			align-items: baseline;
		}
	`}

	& > div:first-of-type {
		display: flex;
		gap: 1.2rem;
		color: var(--color-grey-700);
		font-weight: 500;

		${T.lg`
			p > span{
				display: block;
			}
		`}
	}
	& > div:nth-of-type(2) {
		display: flex;
		gap: 1.2rem;

		${T.lg`
			flex-direction: column;
			align-items: flex-end;
			gap: 0;

			> span{
				display: none;
			}
		`}
	}
`,lt=m.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.6rem;
	padding: 2rem 2.5rem;
	margin-top: 1.5rem;
	border-radius: var(--border-radius-sm);
	color: ${n=>n.$isPaid?"var(--color-green-700)":"var(--color-yellow-700)"};
	background-color: ${n=>n.$isPaid?"var(--color-green-100)":"var(--color-yellow-100)"};

	& > div:first-child {
		align-items: center;

		p {
			text-align: left;
			line-height: 1;
		}

		${T.lg`
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start !important;
			gap: .5rem;
		`}
	}

	& p:last-child {
		text-align: right;
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.2rem;
		width: 2.2rem;
		color: currentColor !important;
	}
`,ft=m.footer`
	padding: 1.6rem 4rem;
	color: var(--color-grey-500);
	text-align: right;
	font-size: 1.2rem;
`;function ye({booking:n}){const{created_at:e,startDate:t,endDate:r,numNights:a,numGuests:o,cabinPrice:d,extrasPrice:c,totalPrice:u,hasBreakfast:g,observations:l,isPaid:y,guests:{fullName:k,email:w,country:v,countryFlag:x,nationalID:b},cabins:{name:h}}=n;return i.jsxs(st,{children:[i.jsxs(ct,{children:[i.jsxs("div",{children:[i.jsx(pe,{}),i.jsxs("p",{children:[a," nights in Cabin ",i.jsx("span",{children:h})]})]}),i.jsxs("small",{children:[L(new Date(t),"EEE, MMM dd yyyy")," (",Je(new Date(t))?"Today":Ee(t),") —"," ",L(new Date(r),"EEE, MMM dd yyyy")]})]}),i.jsxs(dt,{children:[i.jsxs(ut,{children:[i.jsxs("div",{children:[x&&i.jsx(De,{src:x,alt:`Flag of ${v}`}),i.jsxs("p",{children:[i.jsx("span",{children:k}),i.jsx("span",{children:o>1?` + ${o-1} guests`:""})]})]}),i.jsxs("div",{children:[i.jsx("p",{children:w}),i.jsx("span",{children:"•"}),i.jsxs("p",{children:["National ID ",b]})]})]}),l&&i.jsx(Q,{icon:i.jsx(Oe,{}),label:"Observations",children:l}),i.jsx(Q,{icon:i.jsx(ve,{}),label:"Breakfast included?",children:g?"Yes":"No"}),i.jsxs(lt,{$isPaid:y,children:[i.jsxs(Q,{icon:i.jsx(Pe,{}),label:"Total price",children:[i.jsx("span",{children:O(u)}),g&&` (${O(d)} cabin + ${O(c)} breakfast)`]}),i.jsx("p",{children:y?"Paid":"Will pay at property"})]})]}),i.jsx(ft,{children:i.jsxs("p",{children:["Booked ",L(new Date(e),"EEE, MMM dd yyyy, p")]})})]})}const ne=m.div`
	padding: 2.4rem 4rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`;function Pt(){const[n,e]=I.useState(!1),[t,r]=I.useState(!1),{booking:a,isBookingLoading:o}=he(),{settings:d,isSettingLoading:c}=je(),{updateCheckinMutate:u,isCheckinUpdating:g}=at(),l=me();if(I.useEffect(()=>e((a==null?void 0:a.isPaid)??!1),[a==null?void 0:a.isPaid]),!a&&!o&&!c)return i.jsx(re,{dataName:"booking"});if(o||c)return i.jsx(ae,{});const{id:y,guests:k,totalPrice:w,numGuests:v,hasBreakfast:x,numNights:b,isPaid:h}=a,f=d.breakfastPrice*b*v,p=w+f,M=()=>{n&&u(t?{bookingId:y,breakfast:{hasBreakfast:!0,extrasPrice:f,totalPrice:p}}:{bookingId:y,breakfast:{}})};return i.jsxs(i.Fragment,{children:[i.jsxs(oe,{type:"horizontal",children:[i.jsxs(ie,{as:"h1",children:["Check in booking #",y]}),i.jsxs(j,{variation:"ghost",onClick:l,children:[i.jsx(se,{})," Back"]})]}),i.jsx(ye,{booking:a}),!x&&i.jsx(ne,{children:i.jsxs(z,{id:"breakfast",checked:t,onChange:()=>{r(_=>!_),e(!1),h&&t&&e(!0)},disabled:g,children:["Want to add breakfast for ",O(f),"?"]})}),i.jsx(ne,{children:i.jsxs(z,{id:"confirm",checked:n,onChange:()=>e(_=>!_),disabled:n&&!t||g,children:["I confirm that ",k.fullName," has paid the total amount of"," ",t?`${O(p)} (${O(w)} + ${O(f)})`:O(w)," ",h&&!x&&t&&`- Need to extra pay for only breakfast ${O(f)}`]})}),i.jsxs(ce,{children:[i.jsx(j,{onClick:M,disabled:!n||g,children:"Check in booking"}),i.jsx(j,{variation:"secondary",onClick:l,children:"Back"})]})]})}function gt({bookingId:n}){const{updateCheckoutMutate:e,isCheckoutUpdating:t}=ot();return i.jsx(j,{size:"sm",$width:"w-full",onClick:()=>e(n),disabled:t,children:"Check out"})}const jt=m.li`
	display: grid;
	grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
	gap: 1.2rem;
	align-items: center;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);
	font-size: 1.4rem;

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`,Bt=m.div`
	font-weight: 500;
`,Ct=m.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding: 2.4rem 3.2rem 3.2rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
`,Et=m.ul`
	overflow: auto;
	overflow-x: hidden;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		width: 0 !important;
	}

	scrollbar-width: none;
	-ms-overflow-style: none;
`,Mt=m.p`
	margin-top: 0.8rem;
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
`;export{Ot as A,vt as B,gt as C,Bt as G,Mt as N,jt as S,Et as T,kt as a,Ct as b,bt as c,pt as d,Dt as e,L as f,wt as g,Je as h,Se as i,ot as j,rt as k,Pt as l,xt as u};
