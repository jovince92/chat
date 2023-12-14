import{r as e,b as q,m as rt,i as H,_ as O,e as M,n as me,o as st,$ as _e,p as ne,s as ct,t as it,u as Oe,l as lt,v as dt,w as ye,j as _,g as Y,k as ft}from"./utils-64caab42.js";import{$ as ut,u as pt,a as mt,o as $t,s as ht,l as gt,f as vt,b as xt,c as bt,h as wt,d as Ee,e as yt,g as Et,i as St}from"./module-cdae6d27.js";import{n as Ct,o as Pt,p as Tt,q as _t,r as Re,g as Ie,a as De,c as Ne,d as Ae,e as ke,h as Ot,s as Rt}from"./react-drag-drop-files.esm-b088b8bd.js";import{C as It}from"./chevron-down-6a0284dd.js";const ve="dismissableLayer.update",Dt="dismissableLayer.pointerDownOutside",Nt="dismissableLayer.focusOutside";let Se;const At=e.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),kt=e.forwardRef((o,n)=>{var t;const{disableOutsidePointerEvents:a=!1,onEscapeKeyDown:r,onPointerDownOutside:c,onFocusOutside:s,onInteractOutside:i,onDismiss:d,...f}=o,u=e.useContext(At),[h,P]=e.useState(null),x=(t=h==null?void 0:h.ownerDocument)!==null&&t!==void 0?t:globalThis==null?void 0:globalThis.document,[,p]=e.useState({}),v=q(n,w=>P(w)),b=Array.from(u.layers),[$]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),l=b.indexOf($),g=h?b.indexOf(h):-1,A=u.layersWithOutsidePointerEventsDisabled.size>0,D=g>=l,G=Mt(w=>{const N=w.target,K=[...u.branches].some(W=>W.contains(N));!D||K||(c==null||c(w),i==null||i(w),w.defaultPrevented||d==null||d())},x),T=Lt(w=>{const N=w.target;[...u.branches].some(W=>W.contains(N))||(s==null||s(w),i==null||i(w),w.defaultPrevented||d==null||d())},x);return rt(w=>{g===u.layers.size-1&&(r==null||r(w),!w.defaultPrevented&&d&&(w.preventDefault(),d()))},x),e.useEffect(()=>{if(h)return a&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Se=x.body.style.pointerEvents,x.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(h)),u.layers.add(h),Ce(),()=>{a&&u.layersWithOutsidePointerEventsDisabled.size===1&&(x.body.style.pointerEvents=Se)}},[h,x,a,u]),e.useEffect(()=>()=>{h&&(u.layers.delete(h),u.layersWithOutsidePointerEventsDisabled.delete(h),Ce())},[h,u]),e.useEffect(()=>{const w=()=>p({});return document.addEventListener(ve,w),()=>document.removeEventListener(ve,w)},[]),e.createElement(H.div,O({},f,{ref:v,style:{pointerEvents:A?D?"auto":"none":void 0,...o.style},onFocusCapture:M(o.onFocusCapture,T.onFocusCapture),onBlurCapture:M(o.onBlurCapture,T.onBlurCapture),onPointerDownCapture:M(o.onPointerDownCapture,G.onPointerDownCapture)}))});function Mt(o,n=globalThis==null?void 0:globalThis.document){const t=me(o),a=e.useRef(!1),r=e.useRef(()=>{});return e.useEffect(()=>{const c=i=>{if(i.target&&!a.current){let f=function(){Me(Dt,t,d,{discrete:!0})};const d={originalEvent:i};i.pointerType==="touch"?(n.removeEventListener("click",r.current),r.current=f,n.addEventListener("click",r.current,{once:!0})):f()}else n.removeEventListener("click",r.current);a.current=!1},s=window.setTimeout(()=>{n.addEventListener("pointerdown",c)},0);return()=>{window.clearTimeout(s),n.removeEventListener("pointerdown",c),n.removeEventListener("click",r.current)}},[n,t]),{onPointerDownCapture:()=>a.current=!0}}function Lt(o,n=globalThis==null?void 0:globalThis.document){const t=me(o),a=e.useRef(!1);return e.useEffect(()=>{const r=c=>{c.target&&!a.current&&Me(Nt,t,{originalEvent:c},{discrete:!1})};return n.addEventListener("focusin",r),()=>n.removeEventListener("focusin",r)},[n,t]),{onFocusCapture:()=>a.current=!0,onBlurCapture:()=>a.current=!1}}function Ce(){const o=new CustomEvent(ve);document.dispatchEvent(o)}function Me(o,n,t,{discrete:a}){const r=t.originalEvent.target,c=new CustomEvent(o,{bubbles:!1,cancelable:!0,detail:t});n&&r.addEventListener(o,n,{once:!0}),a?st(r,c):r.dispatchEvent(c)}const Le="Popper",[He,We]=_e(Le),[Ht,Ve]=He(Le),Wt=o=>{const{__scopePopper:n,children:t}=o,[a,r]=e.useState(null);return e.createElement(Ht,{scope:n,anchor:a,onAnchorChange:r},t)},Vt="PopperAnchor",Bt=e.forwardRef((o,n)=>{const{__scopePopper:t,virtualRef:a,...r}=o,c=Ve(Vt,t),s=e.useRef(null),i=q(n,s);return e.useEffect(()=>{c.onAnchorChange((a==null?void 0:a.current)||s.current)}),a?null:e.createElement(H.div,O({},r,{ref:i}))}),Be="PopperContent",[Ft,Xo]=He(Be),jt=e.forwardRef((o,n)=>{var t,a,r,c,s,i,d,f;const{__scopePopper:u,side:h="bottom",sideOffset:P=0,align:x="center",alignOffset:p=0,arrowPadding:v=0,avoidCollisions:b=!0,collisionBoundary:$=[],collisionPadding:l=0,sticky:g="partial",hideWhenDetached:A=!1,updatePositionStrategy:D="optimized",onPlaced:G,...T}=o,w=Ve(Be,u),[N,K]=e.useState(null),W=q(n,Q=>K(Q)),[L,X]=e.useState(null),k=ut(L),I=(t=k==null?void 0:k.width)!==null&&t!==void 0?t:0,V=(a=k==null?void 0:k.height)!==null&&a!==void 0?a:0,z=h+(x!=="center"?"-"+x:""),te=typeof l=="number"?l:{top:0,right:0,bottom:0,left:0,...l},U=Array.isArray($)?$:[$],le=U.length>0,Z={padding:te,boundary:U.filter(Kt),altBoundary:le},{refs:de,floatingStyles:re,placement:oe,isPositioned:J,middlewareData:j}=pt({strategy:"fixed",placement:z,whileElementsMounted:(...Q)=>mt(...Q,{animationFrame:D==="always"}),elements:{reference:w.anchor},middleware:[$t({mainAxis:P+V,alignmentAxis:p}),b&&ht({mainAxis:!0,crossAxis:!1,limiter:g==="partial"?gt():void 0,...Z}),b&&vt({...Z}),xt({...Z,apply:({elements:Q,rects:se,availableWidth:fe,availableHeight:ot})=>{const{width:nt,height:at}=se.reference,ue=Q.floating.style;ue.setProperty("--radix-popper-available-width",`${fe}px`),ue.setProperty("--radix-popper-available-height",`${ot}px`),ue.setProperty("--radix-popper-anchor-width",`${nt}px`),ue.setProperty("--radix-popper-anchor-height",`${at}px`)}}),L&&bt({element:L,padding:v}),zt({arrowWidth:I,arrowHeight:V}),A&&wt({strategy:"referenceHidden",...Z})]}),[m,S]=Fe(oe),R=me(G);ne(()=>{J&&(R==null||R())},[J,R]);const C=(r=j.arrow)===null||r===void 0?void 0:r.x,y=(c=j.arrow)===null||c===void 0?void 0:c.y,E=((s=j.arrow)===null||s===void 0?void 0:s.centerOffset)!==0,[B,F]=e.useState();return ne(()=>{N&&F(window.getComputedStyle(N).zIndex)},[N]),e.createElement("div",{ref:de.setFloating,"data-radix-popper-content-wrapper":"",style:{...re,transform:J?re.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:B,"--radix-popper-transform-origin":[(i=j.transformOrigin)===null||i===void 0?void 0:i.x,(d=j.transformOrigin)===null||d===void 0?void 0:d.y].join(" ")},dir:o.dir},e.createElement(Ft,{scope:u,placedSide:m,onArrowChange:X,arrowX:C,arrowY:y,shouldHideArrow:E},e.createElement(H.div,O({"data-side":m,"data-align":S},T,{ref:W,style:{...T.style,animation:J?void 0:"none",opacity:(f=j.hide)!==null&&f!==void 0&&f.referenceHidden?0:void 0}}))))});function Kt(o){return o!==null}const zt=o=>({name:"transformOrigin",options:o,fn(n){var t,a,r,c,s;const{placement:i,rects:d,middlewareData:f}=n,h=((t=f.arrow)===null||t===void 0?void 0:t.centerOffset)!==0,P=h?0:o.arrowWidth,x=h?0:o.arrowHeight,[p,v]=Fe(i),b={start:"0%",center:"50%",end:"100%"}[v],$=((a=(r=f.arrow)===null||r===void 0?void 0:r.x)!==null&&a!==void 0?a:0)+P/2,l=((c=(s=f.arrow)===null||s===void 0?void 0:s.y)!==null&&c!==void 0?c:0)+x/2;let g="",A="";return p==="bottom"?(g=h?b:`${$}px`,A=`${-x}px`):p==="top"?(g=h?b:`${$}px`,A=`${d.floating.height+x}px`):p==="right"?(g=`${-x}px`,A=h?b:`${l}px`):p==="left"&&(g=`${d.floating.width+x}px`,A=h?b:`${l}px`),{data:{x:g,y:A}}}});function Fe(o){const[n,t="center"]=o.split("-");return[n,t]}const Ut=Wt,qt=Bt,Xt=jt,Yt=e.forwardRef((o,n)=>{var t;const{container:a=globalThis==null||(t=globalThis.document)===null||t===void 0?void 0:t.body,...r}=o;return a?ct.createPortal(e.createElement(H.div,O({},r,{ref:n})),a):null});function Gt(o){const n=e.useRef({value:o,previous:o});return e.useMemo(()=>(n.current.value!==o&&(n.current.previous=n.current.value,n.current.value=o),n.current.previous),[o])}const Zt=[" ","Enter","ArrowUp","ArrowDown"],Jt=[" ","Enter"],$e="Select",[he,be,Qt]=it($e),[ie,Yo]=_e($e,[Qt,We]),we=We(),[eo,ae]=ie($e),[to,oo]=ie($e),no=o=>{const{__scopeSelect:n,children:t,open:a,defaultOpen:r,onOpenChange:c,value:s,defaultValue:i,onValueChange:d,dir:f,name:u,autoComplete:h,disabled:P,required:x}=o,p=we(n),[v,b]=e.useState(null),[$,l]=e.useState(null),[g,A]=e.useState(!1),D=yt(f),[G=!1,T]=ye({prop:a,defaultProp:r,onChange:c}),[w,N]=ye({prop:s,defaultProp:i,onChange:d}),K=e.useRef(null),W=v?!!v.closest("form"):!0,[L,X]=e.useState(new Set),k=Array.from(L).map(I=>I.props.value).join(";");return e.createElement(Ut,p,e.createElement(eo,{required:x,scope:n,trigger:v,onTriggerChange:b,valueNode:$,onValueNodeChange:l,valueNodeHasChildren:g,onValueNodeHasChildrenChange:A,contentId:Re(),value:w,onValueChange:N,open:G,onOpenChange:T,dir:D,triggerPointerDownPosRef:K,disabled:P},e.createElement(he.Provider,{scope:n},e.createElement(to,{scope:o.__scopeSelect,onNativeOptionAdd:e.useCallback(I=>{X(V=>new Set(V).add(I))},[]),onNativeOptionRemove:e.useCallback(I=>{X(V=>{const z=new Set(V);return z.delete(I),z})},[])},t)),W?e.createElement(Ue,{key:k,"aria-hidden":!0,required:x,tabIndex:-1,name:u,autoComplete:h,value:w,onChange:I=>N(I.target.value),disabled:P},w===void 0?e.createElement("option",{value:""}):null,Array.from(L)):null))},ao="SelectTrigger",ro=e.forwardRef((o,n)=>{const{__scopeSelect:t,disabled:a=!1,...r}=o,c=we(t),s=ae(ao,t),i=s.disabled||a,d=q(n,s.onTriggerChange),f=be(t),[u,h,P]=qe(p=>{const v=f().filter(l=>!l.disabled),b=v.find(l=>l.value===s.value),$=Xe(v,p,b);$!==void 0&&s.onValueChange($.value)}),x=()=>{i||(s.onOpenChange(!0),P())};return e.createElement(qt,O({asChild:!0},c),e.createElement(H.button,O({type:"button",role:"combobox","aria-controls":s.contentId,"aria-expanded":s.open,"aria-required":s.required,"aria-autocomplete":"none",dir:s.dir,"data-state":s.open?"open":"closed",disabled:i,"data-disabled":i?"":void 0,"data-placeholder":ze(s.value)?"":void 0},r,{ref:d,onClick:M(r.onClick,p=>{p.currentTarget.focus()}),onPointerDown:M(r.onPointerDown,p=>{const v=p.target;v.hasPointerCapture(p.pointerId)&&v.releasePointerCapture(p.pointerId),p.button===0&&p.ctrlKey===!1&&(x(),s.triggerPointerDownPosRef.current={x:Math.round(p.pageX),y:Math.round(p.pageY)},p.preventDefault())}),onKeyDown:M(r.onKeyDown,p=>{const v=u.current!=="";!(p.ctrlKey||p.altKey||p.metaKey)&&p.key.length===1&&h(p.key),!(v&&p.key===" ")&&Zt.includes(p.key)&&(x(),p.preventDefault())})})))}),so="SelectValue",co=e.forwardRef((o,n)=>{const{__scopeSelect:t,className:a,style:r,children:c,placeholder:s="",...i}=o,d=ae(so,t),{onValueNodeHasChildrenChange:f}=d,u=c!==void 0,h=q(n,d.onValueNodeChange);return ne(()=>{f(u)},[f,u]),e.createElement(H.span,O({},i,{ref:h,style:{pointerEvents:"none"}}),ze(d.value)?e.createElement(e.Fragment,null,s):c)}),io=e.forwardRef((o,n)=>{const{__scopeSelect:t,children:a,...r}=o;return e.createElement(H.span,O({"aria-hidden":!0},r,{ref:n}),a||"▼")}),lo=o=>e.createElement(Yt,O({asChild:!0},o)),ce="SelectContent",fo=e.forwardRef((o,n)=>{const t=ae(ce,o.__scopeSelect),[a,r]=e.useState();if(ne(()=>{r(new DocumentFragment)},[]),!t.open){const c=a;return c?Oe.createPortal(e.createElement(je,{scope:o.__scopeSelect},e.createElement(he.Slot,{scope:o.__scopeSelect},e.createElement("div",null,o.children))),c):null}return e.createElement(uo,O({},o,{ref:n}))}),ee=10,[je,ge]=ie(ce),uo=e.forwardRef((o,n)=>{const{__scopeSelect:t,position:a="item-aligned",onCloseAutoFocus:r,onEscapeKeyDown:c,onPointerDownOutside:s,side:i,sideOffset:d,align:f,alignOffset:u,arrowPadding:h,collisionBoundary:P,collisionPadding:x,sticky:p,hideWhenDetached:v,avoidCollisions:b,...$}=o,l=ae(ce,t),[g,A]=e.useState(null),[D,G]=e.useState(null),T=q(n,m=>A(m)),[w,N]=e.useState(null),[K,W]=e.useState(null),L=be(t),[X,k]=e.useState(!1),I=e.useRef(!1);e.useEffect(()=>{if(g)return Ct(g)},[g]),Pt();const V=e.useCallback(m=>{const[S,...R]=L().map(E=>E.ref.current),[C]=R.slice(-1),y=document.activeElement;for(const E of m)if(E===y||(E==null||E.scrollIntoView({block:"nearest"}),E===S&&D&&(D.scrollTop=0),E===C&&D&&(D.scrollTop=D.scrollHeight),E==null||E.focus(),document.activeElement!==y))return},[L,D]),z=e.useCallback(()=>V([w,g]),[V,w,g]);e.useEffect(()=>{X&&z()},[X,z]);const{onOpenChange:te,triggerPointerDownPosRef:U}=l;e.useEffect(()=>{if(g){let m={x:0,y:0};const S=C=>{var y,E,B,F;m={x:Math.abs(Math.round(C.pageX)-((y=(E=U.current)===null||E===void 0?void 0:E.x)!==null&&y!==void 0?y:0)),y:Math.abs(Math.round(C.pageY)-((B=(F=U.current)===null||F===void 0?void 0:F.y)!==null&&B!==void 0?B:0))}},R=C=>{m.x<=10&&m.y<=10?C.preventDefault():g.contains(C.target)||te(!1),document.removeEventListener("pointermove",S),U.current=null};return U.current!==null&&(document.addEventListener("pointermove",S),document.addEventListener("pointerup",R,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",S),document.removeEventListener("pointerup",R,{capture:!0})}}},[g,te,U]),e.useEffect(()=>{const m=()=>te(!1);return window.addEventListener("blur",m),window.addEventListener("resize",m),()=>{window.removeEventListener("blur",m),window.removeEventListener("resize",m)}},[te]);const[le,Z]=qe(m=>{const S=L().filter(y=>!y.disabled),R=S.find(y=>y.ref.current===document.activeElement),C=Xe(S,m,R);C&&setTimeout(()=>C.ref.current.focus())}),de=e.useCallback((m,S,R)=>{const C=!I.current&&!R;(l.value!==void 0&&l.value===S||C)&&(N(m),C&&(I.current=!0))},[l.value]),re=e.useCallback(()=>g==null?void 0:g.focus(),[g]),oe=e.useCallback((m,S,R)=>{const C=!I.current&&!R;(l.value!==void 0&&l.value===S||C)&&W(m)},[l.value]),J=a==="popper"?Pe:po,j=J===Pe?{side:i,sideOffset:d,align:f,alignOffset:u,arrowPadding:h,collisionBoundary:P,collisionPadding:x,sticky:p,hideWhenDetached:v,avoidCollisions:b}:{};return e.createElement(je,{scope:t,content:g,viewport:D,onViewportChange:G,itemRefCallback:de,selectedItem:w,onItemLeave:re,itemTextRefCallback:oe,focusSelectedItem:z,selectedItemText:K,position:a,isPositioned:X,searchRef:le},e.createElement(Tt,{as:lt,allowPinchZoom:!0},e.createElement(_t,{asChild:!0,trapped:l.open,onMountAutoFocus:m=>{m.preventDefault()},onUnmountAutoFocus:M(r,m=>{var S;(S=l.trigger)===null||S===void 0||S.focus({preventScroll:!0}),m.preventDefault()})},e.createElement(kt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:c,onPointerDownOutside:s,onFocusOutside:m=>m.preventDefault(),onDismiss:()=>l.onOpenChange(!1)},e.createElement(J,O({role:"listbox",id:l.contentId,"data-state":l.open?"open":"closed",dir:l.dir,onContextMenu:m=>m.preventDefault()},$,j,{onPlaced:()=>k(!0),ref:T,style:{display:"flex",flexDirection:"column",outline:"none",...$.style},onKeyDown:M($.onKeyDown,m=>{const S=m.ctrlKey||m.altKey||m.metaKey;if(m.key==="Tab"&&m.preventDefault(),!S&&m.key.length===1&&Z(m.key),["ArrowUp","ArrowDown","Home","End"].includes(m.key)){let C=L().filter(y=>!y.disabled).map(y=>y.ref.current);if(["ArrowUp","End"].includes(m.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(m.key)){const y=m.target,E=C.indexOf(y);C=C.slice(E+1)}setTimeout(()=>V(C)),m.preventDefault()}})}))))))}),po=e.forwardRef((o,n)=>{const{__scopeSelect:t,onPlaced:a,...r}=o,c=ae(ce,t),s=ge(ce,t),[i,d]=e.useState(null),[f,u]=e.useState(null),h=q(n,T=>u(T)),P=be(t),x=e.useRef(!1),p=e.useRef(!0),{viewport:v,selectedItem:b,selectedItemText:$,focusSelectedItem:l}=s,g=e.useCallback(()=>{if(c.trigger&&c.valueNode&&i&&f&&v&&b&&$){const T=c.trigger.getBoundingClientRect(),w=f.getBoundingClientRect(),N=c.valueNode.getBoundingClientRect(),K=$.getBoundingClientRect();if(c.dir!=="rtl"){const y=K.left-w.left,E=N.left-y,B=T.left-E,F=T.width+B,Q=Math.max(F,w.width),se=window.innerWidth-ee,fe=Ee(E,[ee,se-Q]);i.style.minWidth=F+"px",i.style.left=fe+"px"}else{const y=w.right-K.right,E=window.innerWidth-N.right-y,B=window.innerWidth-T.right-E,F=T.width+B,Q=Math.max(F,w.width),se=window.innerWidth-ee,fe=Ee(E,[ee,se-Q]);i.style.minWidth=F+"px",i.style.right=fe+"px"}const W=P(),L=window.innerHeight-ee*2,X=v.scrollHeight,k=window.getComputedStyle(f),I=parseInt(k.borderTopWidth,10),V=parseInt(k.paddingTop,10),z=parseInt(k.borderBottomWidth,10),te=parseInt(k.paddingBottom,10),U=I+V+X+te+z,le=Math.min(b.offsetHeight*5,U),Z=window.getComputedStyle(v),de=parseInt(Z.paddingTop,10),re=parseInt(Z.paddingBottom,10),oe=T.top+T.height/2-ee,J=L-oe,j=b.offsetHeight/2,m=b.offsetTop+j,S=I+V+m,R=U-S;if(S<=oe){const y=b===W[W.length-1].ref.current;i.style.bottom="0px";const E=f.clientHeight-v.offsetTop-v.offsetHeight,B=Math.max(J,j+(y?re:0)+E+z),F=S+B;i.style.height=F+"px"}else{const y=b===W[0].ref.current;i.style.top="0px";const B=Math.max(oe,I+v.offsetTop+(y?de:0)+j)+R;i.style.height=B+"px",v.scrollTop=S-oe+v.offsetTop}i.style.margin=`${ee}px 0`,i.style.minHeight=le+"px",i.style.maxHeight=L+"px",a==null||a(),requestAnimationFrame(()=>x.current=!0)}},[P,c.trigger,c.valueNode,i,f,v,b,$,c.dir,a]);ne(()=>g(),[g]);const[A,D]=e.useState();ne(()=>{f&&D(window.getComputedStyle(f).zIndex)},[f]);const G=e.useCallback(T=>{T&&p.current===!0&&(g(),l==null||l(),p.current=!1)},[g,l]);return e.createElement(mo,{scope:t,contentWrapper:i,shouldExpandOnScrollRef:x,onScrollButtonChange:G},e.createElement("div",{ref:d,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:A}},e.createElement(H.div,O({},r,{ref:h,style:{boxSizing:"border-box",maxHeight:"100%",...r.style}}))))}),Pe=e.forwardRef((o,n)=>{const{__scopeSelect:t,align:a="start",collisionPadding:r=ee,...c}=o,s=we(t);return e.createElement(Xt,O({},s,c,{ref:n,align:a,collisionPadding:r,style:{boxSizing:"border-box",...c.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}}))}),[mo,$o]=ie(ce,{}),Te="SelectViewport",ho=e.forwardRef((o,n)=>{const{__scopeSelect:t,...a}=o,r=ge(Te,t),c=$o(Te,t),s=q(n,r.onViewportChange),i=e.useRef(0);return e.createElement(e.Fragment,null,e.createElement("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"}}),e.createElement(he.Slot,{scope:t},e.createElement(H.div,O({"data-radix-select-viewport":"",role:"presentation"},a,{ref:s,style:{position:"relative",flex:1,overflow:"auto",...a.style},onScroll:M(a.onScroll,d=>{const f=d.currentTarget,{contentWrapper:u,shouldExpandOnScrollRef:h}=c;if(h!=null&&h.current&&u){const P=Math.abs(i.current-f.scrollTop);if(P>0){const x=window.innerHeight-ee*2,p=parseFloat(u.style.minHeight),v=parseFloat(u.style.height),b=Math.max(p,v);if(b<x){const $=b+P,l=Math.min(x,$),g=$-l;u.style.height=l+"px",u.style.bottom==="0px"&&(f.scrollTop=g>0?g:0,u.style.justifyContent="flex-end")}}}i.current=f.scrollTop})}))))}),go="SelectGroup",[Go,vo]=ie(go),xo="SelectLabel",bo=e.forwardRef((o,n)=>{const{__scopeSelect:t,...a}=o,r=vo(xo,t);return e.createElement(H.div,O({id:r.id},a,{ref:n}))}),xe="SelectItem",[wo,Ke]=ie(xe),yo=e.forwardRef((o,n)=>{const{__scopeSelect:t,value:a,disabled:r=!1,textValue:c,...s}=o,i=ae(xe,t),d=ge(xe,t),f=i.value===a,[u,h]=e.useState(c??""),[P,x]=e.useState(!1),p=q(n,$=>{var l;return(l=d.itemRefCallback)===null||l===void 0?void 0:l.call(d,$,a,r)}),v=Re(),b=()=>{r||(i.onValueChange(a),i.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return e.createElement(wo,{scope:t,value:a,disabled:r,textId:v,isSelected:f,onItemTextChange:e.useCallback($=>{h(l=>{var g;return l||((g=$==null?void 0:$.textContent)!==null&&g!==void 0?g:"").trim()})},[])},e.createElement(he.ItemSlot,{scope:t,value:a,disabled:r,textValue:u},e.createElement(H.div,O({role:"option","aria-labelledby":v,"data-highlighted":P?"":void 0,"aria-selected":f&&P,"data-state":f?"checked":"unchecked","aria-disabled":r||void 0,"data-disabled":r?"":void 0,tabIndex:r?void 0:-1},s,{ref:p,onFocus:M(s.onFocus,()=>x(!0)),onBlur:M(s.onBlur,()=>x(!1)),onPointerUp:M(s.onPointerUp,b),onPointerMove:M(s.onPointerMove,$=>{if(r){var l;(l=d.onItemLeave)===null||l===void 0||l.call(d)}else $.currentTarget.focus({preventScroll:!0})}),onPointerLeave:M(s.onPointerLeave,$=>{if($.currentTarget===document.activeElement){var l;(l=d.onItemLeave)===null||l===void 0||l.call(d)}}),onKeyDown:M(s.onKeyDown,$=>{var l;((l=d.searchRef)===null||l===void 0?void 0:l.current)!==""&&$.key===" "||(Jt.includes($.key)&&b(),$.key===" "&&$.preventDefault())})}))))}),pe="SelectItemText",Eo=e.forwardRef((o,n)=>{const{__scopeSelect:t,className:a,style:r,...c}=o,s=ae(pe,t),i=ge(pe,t),d=Ke(pe,t),f=oo(pe,t),[u,h]=e.useState(null),P=q(n,$=>h($),d.onItemTextChange,$=>{var l;return(l=i.itemTextRefCallback)===null||l===void 0?void 0:l.call(i,$,d.value,d.disabled)}),x=u==null?void 0:u.textContent,p=e.useMemo(()=>e.createElement("option",{key:d.value,value:d.value,disabled:d.disabled},x),[d.disabled,d.value,x]),{onNativeOptionAdd:v,onNativeOptionRemove:b}=f;return ne(()=>(v(p),()=>b(p)),[v,b,p]),e.createElement(e.Fragment,null,e.createElement(H.span,O({id:d.textId},c,{ref:P})),d.isSelected&&s.valueNode&&!s.valueNodeHasChildren?Oe.createPortal(c.children,s.valueNode):null)}),So="SelectItemIndicator",Co=e.forwardRef((o,n)=>{const{__scopeSelect:t,...a}=o;return Ke(So,t).isSelected?e.createElement(H.span,O({"aria-hidden":!0},a,{ref:n})):null}),Po=e.forwardRef((o,n)=>{const{__scopeSelect:t,...a}=o;return e.createElement(H.div,O({"aria-hidden":!0},a,{ref:n}))});function ze(o){return o===""||o===void 0}const Ue=e.forwardRef((o,n)=>{const{value:t,...a}=o,r=e.useRef(null),c=q(n,r),s=Gt(t);return e.useEffect(()=>{const i=r.current,d=window.HTMLSelectElement.prototype,u=Object.getOwnPropertyDescriptor(d,"value").set;if(s!==t&&u){const h=new Event("change",{bubbles:!0});u.call(i,t),i.dispatchEvent(h)}},[s,t]),e.createElement(dt,{asChild:!0},e.createElement("select",O({},a,{ref:c,defaultValue:t})))});Ue.displayName="BubbleSelect";function qe(o){const n=me(o),t=e.useRef(""),a=e.useRef(0),r=e.useCallback(s=>{const i=t.current+s;n(i),function d(f){t.current=f,window.clearTimeout(a.current),f!==""&&(a.current=window.setTimeout(()=>d(""),1e3))}(i)},[n]),c=e.useCallback(()=>{t.current="",window.clearTimeout(a.current)},[]);return e.useEffect(()=>()=>window.clearTimeout(a.current),[]),[t,r,c]}function Xe(o,n,t){const r=n.length>1&&Array.from(n).every(f=>f===n[0])?n[0]:n,c=t?o.indexOf(t):-1;let s=To(o,Math.max(c,0));r.length===1&&(s=s.filter(f=>f!==t));const d=s.find(f=>f.textValue.toLowerCase().startsWith(r.toLowerCase()));return d!==t?d:void 0}function To(o,n){return o.map((t,a)=>o[(n+a)%o.length])}const _o=no,Ye=ro,Oo=co,Ro=io,Io=lo,Ge=fo,Do=ho,Ze=bo,Je=yo,No=Eo,Ao=Co,Qe=Po,Zo=_o,Jo=Oo,ko=e.forwardRef(({className:o,children:n,...t},a)=>_.jsxs(Ye,{ref:a,className:Y("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",o),...t,children:[n,_.jsx(Ro,{asChild:!0,children:_.jsx(It,{className:"h-4 w-4 opacity-50"})})]}));ko.displayName=Ye.displayName;const Mo=e.forwardRef(({className:o,children:n,position:t="popper",...a},r)=>_.jsx(Io,{children:_.jsx(Ge,{ref:r,className:Y("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",o),position:t,...a,children:_.jsx(Do,{className:Y("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n})})}));Mo.displayName=Ge.displayName;const Lo=e.forwardRef(({className:o,...n},t)=>_.jsx(Ze,{ref:t,className:Y("py-1.5 pl-8 pr-2 text-sm font-semibold",o),...n}));Lo.displayName=Ze.displayName;const Ho=e.forwardRef(({className:o,children:n,...t},a)=>_.jsxs(Je,{ref:a,className:Y("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",o),...t,children:[_.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:_.jsx(Ao,{children:_.jsx(Et,{className:"h-4 w-4"})})}),_.jsx(No,{children:n})]}));Ho.displayName=Je.displayName;const Wo=e.forwardRef(({className:o,...n},t)=>_.jsx(Qe,{ref:t,className:Y("-mx-1 my-1 h-px bg-muted",o),...n}));Wo.displayName=Qe.displayName;const Qo=Ot,en=Rt,et=({...o})=>_.jsx(Ie,{...o});et.displayName=Ie.displayName;const tt=e.forwardRef(({className:o,...n},t)=>_.jsx(De,{className:Y("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",o),...n,ref:t}));tt.displayName=De.displayName;const Vo=ft("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),Bo=e.forwardRef(({side:o="right",className:n,children:t,...a},r)=>_.jsxs(et,{children:[_.jsx(tt,{}),_.jsx(Ne,{ref:r,className:Y(Vo({side:o}),n),...a,children:t})]}));Bo.displayName=Ne.displayName;const Fo=e.forwardRef(({className:o,...n},t)=>_.jsx(Ae,{ref:t,className:Y("text-lg font-semibold text-foreground",o),...n}));Fo.displayName=Ae.displayName;const jo=e.forwardRef(({className:o,...n},t)=>_.jsx(ke,{ref:t,className:Y("text-sm text-muted-foreground",o),...n}));jo.displayName=ke.displayName;const tn=St(o=>({conversationId:0,isVideo:!1,toggle:(n,t)=>o({isVideo:n,conversationId:n?t:0})}));export{Zo as S,ko as a,Jo as b,Mo as c,Ho as d,Qo as e,en as f,Bo as g,tn as u};
