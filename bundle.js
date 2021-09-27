import*as e from"react";const t=(e,t)=>e.start.getTime()-t.start.getTime(),i=(e,{startTime:t,ratio:i})=>{const r=e.start.getTime()-t,a=e.end.getTime()-t,s=Math.round(r*i);return{width:Math.round(a*i)-s,left:s}},{useRef:r,useEffect:a}=e,{format:s,isToday:l,isPast:n,addDays:o,startOfDay:d}=require("date-fns"),c=({evt:t})=>e.createElement("div",{key:t.id,className:"react-scrollable-timeline-event"},t.title?t.title:t.id),m=({group:t,maxHeight:i,resourceNode:r})=>e.createElement("div",{style:{position:"relative",height:i+36}},e.createElement("div",{className:"resource-header",style:{height:i+36}},r({group:t}))),h=({childs:t,maxHeight:i,viewSize:{width:r}})=>e.createElement("div",{className:"timeline-separator",style:{height:i+36,overflow:"hidden",width:r}},t),p=({group:{title:t}})=>e.createElement("div",null,t),u=t=>e.createElement("div",null,s(t.start,"yyyy-MM-dd")),g=(e,t)=>e&&t&&e&&t[e]?t[e]:{title:e||""},v=({groups:s,events:v,startDate:w=d(new Date),endDate:x=o(d(new Date),40),width:b=5e3,interval:E=864e5,resourceHeaderWidth:D=200,groupKey:k,getGroupData:T=g,resourceNode:N=p,itemNode:j=c,dateNode:H=u,onEventClick:O=(e=>e)})=>{const $=w.getTime(),S=x.getTime()-$,z={startDate:w,startTime:$,endDate:x,totalTicks:S,ratio:b/S,width:b},M=r(null),C=r(null),G=e=>i(e,z),W=(F=e=>k?e[k]:"single",v.reduce(((e,t)=>{const i=F(t);return Object.assign(Object.assign({},e),{[i]:[...e[i]||[],t]})}),{}));var F;const I=(({start:e,end:t,interval:i})=>{const r=[],a=e.getTime(),s=t.getTime(),l=Math.ceil((s-a)/i);for(let e=0;e<l;e++)r.push({start:new Date(a+i*e),end:new Date(a+i*(e+1))});return r})({start:w,end:x,interval:E}),q=I.map((t=>((t,i,r)=>{const{width:a,left:s}=r(i);let o="is-future";switch(!0){default:o="is-future";break;case l(i.start):o="is-today";break;case n(i.start):o="is-past"}return e.createElement("div",{key:`datenode-${i.start.getTime()}`,style:{width:`${a}px`,position:"absolute",left:`${s}px`,top:0},className:"react-scrollable-timeline-date "+o},t(i))})(H,t,G))),K=((e,t)=>{const i=[];return Object.keys(e).map((r=>{i.push(Object.assign(Object.assign({},t(e[r],r)),{key:r}))})),i})(W,(i=>i.sort(t).reduce(((t,i,r)=>({rendered:a=[],maxHeight:s=0,elements:l=[]},n)=>{const o=((e,t)=>t.filter((t=>t.id!=e.id)).filter((t=>{return r=e,!((i=t).end<=r.start||i.start>=r.end);var i,r})))(n,a);let d=o.length;for(let e=0;e<a.length+1;e++)if(!o.some((t=>t.positionFromTop==e))){d=e;break}const c=36*d;return{elements:[...l,e.createElement("div",{key:n.id,className:"timeline-event-wrapper "+(r?"pointer":""),style:Object.assign(Object.assign({},i(n)),{height:36,top:c}),onClick:()=>r(n)},e.createElement(t,{evt:n}))],maxHeight:Math.max(s||0,c),rendered:[...a,Object.assign(Object.assign({},n),{positionFromTop:d})]}})(j,G,O),{}))),L=K.map((({maxHeight:t,key:i})=>e.createElement(m,{key:`resource-${i}`,group:T(i,s),resourceNode:N,maxHeight:t}))),P=K.map((({elements:t,maxHeight:i,key:r})=>e.createElement(h,{key:`group-${r}`,maxHeight:i,childs:t,viewSize:z})));return a((()=>{if(M&&M.current){const e=M.current.children[0].clientHeight;M.current.style.height=`${e}px`,C&&C.current&&(C.current.style.marginTop=e-1+"px")}}),[]),e.createElement("div",{className:"react-scrollable-timeline",style:{maxWidth:"100%",position:"relative",display:"flex",flexDirection:"row",border:"1px solid #DDD"}},k&&e.createElement("div",{ref:C,style:{width:`${D}px`,position:"relative",flexGrow:0,flexShrink:0}},L),e.createElement("div",{style:{overflowX:"scroll",maxWidth:"100%",position:"relative",flexGrow:1}},e.createElement(y,{dates:I,lineItem:f,viewSize:z}),e.createElement("div",{ref:M,style:{width:z.width,position:"relative",height:"5rem"}},q),P))},y=({dates:t,lineItem:i,viewSize:r})=>e.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},t.map((e=>i({date:e,viewSize:r})))),f=({date:t,viewSize:r})=>{const{width:a,left:s}=i(t,r);return e.createElement("div",{key:`line-${t.start.getTime()}`,style:{width:`${a}px`,display:"inline-flex",position:"absolute",left:`${s}px`,height:"100%",borderLeft:"1px solid #DDD",top:0}})};export{v as Timeline};
