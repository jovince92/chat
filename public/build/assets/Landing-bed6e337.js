import{c as L,q as S,r as l,W as F,h as D,j as e,g as C,a as R,y as P}from"./utils-64caab42.js";import{S as T,a as I,b as q,c as z,d as H,e as W,R as $}from"./module-c8edc7dc.js";import{U as O,A as Y,R as Q,f as B,u as G,L as A,S as U,C as K,M as V,a as J,b as X}from"./index-487fe938.js";import{I as k,B as w,$ as Z,L as _,A as ee,a as se,b as te}from"./alert-7fe151e9.js";import{t as E,u as ae}from"./app-37a98c0e.js";import{A as re,a as le,b as ne,c as ie,d as oe,e as ce}from"./alert-dialog-fd3e1fb6.js";import{D as de,i as me,j as xe,l as ue}from"./react-drag-drop-files.esm-b088b8bd.js";import{A as he}from"./alert-circle-1273824c.js";import{L as pe}from"./loader-f5ec6bed.js";import"./upload-cloud-365b74f1.js";import"./chevron-down-6a0284dd.js";const fe=L("School",[["path",{d:"m4 6 8-4 8 4",key:"1q0ilc"}],["path",{d:"m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2",key:"1vwozw"}],["path",{d:"M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4",key:"cpkuc4"}],["path",{d:"M18 5v17",key:"1sw6gf"}],["path",{d:"M6 5v17",key:"1xfsm0"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}]]),je="d MMMM yyyy HH:mm",ge=({message:t,type:f,channel:h,onReply:m,hasClickedReply:p,isLastMsg:s})=>{var y;const{replies:a}=S().props,[c,o]=l.useState(t.content),[n,g]=l.useState(!1),[j,N]=l.useState(!1),{user:d}=t,v=(y=t.file)==null?void 0:y.split(".").pop(),x=v==="pdf"?route("home")+"/uploads/pdf/pdf.png":t.file,r=l.useRef(null);F({user_id:t.user_id});const b=l.useCallback(i=>{i.preventDefault(),g(!0),D.post(route("server.channel.message.update",{server_id:h.server_id,channel_id:h.id}),{message:c,message_id:t.id}).then(()=>N(!1)).catch(()=>E({title:"Internal Error",description:"Please Try Again"})).finally(()=>g(!1))},[h,c,t.id,f]);l.useEffect(()=>{r.current&&r.current.focus();const i=M=>{(M.key==="Escape"||M.code==="Escape")&&N(!1)};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[]);const u=i=>{m&&m(i)};return l.useEffect(()=>{r.current&&j&&r.current.focus()},[r,j]),e.jsx("div",{className:"relative group flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-900 p-3.5 transition w-full",children:e.jsxs("div",{className:"group flex gap-x-1.5 items-start w-full",children:[e.jsx("div",{className:"cursor-pointer hover:drop-shadow-md transition",children:t.is_system_msg===0?e.jsx(O,{user:d}):""}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsxs("div",{className:"flex items-center gap-x-1.5",children:[e.jsx("div",{className:"flex items-center",children:t.is_system_msg===0?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:C("font-semibold text-sm transition"),children:d.name}),e.jsx(Y,{label:"Admin",children:e.jsx("p",{children:Q.ADMIN})})]}):e.jsx("p",{className:C("font-semibold text-sm transition"),children:"System"})}),e.jsx("span",{className:"text-xs text-neutral-500 dark:text-neutral-400",children:B(new Date(t.created_at),je)})]}),t.file&&!t.deleted_at&&e.jsx("a",{href:t.file,target:"_blank",rel:"noopener noreferrer",className:C("relative aspect-square rounded-md mt-1.5 overflow-hidden border flex items-center bg-secondary ",v==="pdf"?"h-10 w-10":"h-48 w-48"),children:e.jsx("img",{src:x,alt:"file",className:"object-cover"})}),e.jsx("p",{className:C("text-xs",v==="pdf"&&!t.deleted_at?"block":"hidden"),children:"PDF File"}),!j&&e.jsxs("p",{className:C("text-sm my-4 text-neutral-600 dark:text-neutral-300",t.deleted_at&&"italic text-neutral-500 dark:text-neutral-400 text-xs mt-1"),children:[t.deleted_at?"Message Deleted":t.content,t.created_at!==t.updated_at&&!t.deleted_at&&e.jsx("span",{className:"text-[0.625rem] mx-1.5 text-neutral-500 dark:text-neutral-400",children:"(edited)"})]}),!t.file&&j&&e.jsxs(e.Fragment,{children:[e.jsxs("form",{className:"flex items-center w-full gap-x-1.5 pt-1.5",onSubmit:b,children:[e.jsx("div",{className:"flex-1",children:e.jsx(k,{disabled:n,ref:r,value:c,onChange:({target:i})=>o(i.value),className:"p-1.5 bg-neutral-200/90 dark:bg-neutral-700/75 border-none !border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 text-neutral-600 dark:text-neutral-200"})}),e.jsx(w,{size:"sm",disabled:n,children:"Save"})]}),e.jsx("span",{className:"text-[0.625rem] mt-1 text-neutral-400",children:"Press ESC to cancel. Press Enter to save."})]}),t.is_system_msg===1&&!p&&h.is_closed!==1&&s&&e.jsx("div",{className:"w-full grid grid-cols-2 gap-3 pb-3.5",children:a.map(i=>e.jsx(w,{variant:"outline",size:"sm",onClick:()=>u(i),children:i},i))})]})]})})},ve=({channel:t,getMsgsRoute:f,onReply:h,hasClickedReply:m})=>{var v,x;const p=l.useRef(null),s=l.useRef(null),{data:a,fetchNextPage:c,hasNextPage:o,isFetchingNextPage:n,status:g}=G({queryRoute:f,queryKey:`channel_${t.id.toString()}`,value:"0"}),j=()=>{if(!(a!=null&&a.pages))return null;c()},N=r=>{h&&h(r)};l.useEffect(()=>{console.log(s),setTimeout(()=>{var r;return(r=s.current)==null?void 0:r.scrollIntoView({behavior:"smooth",block:"center"})},100)},[s,(x=(v=a==null?void 0:a.pages)==null?void 0:v[0])==null?void 0:x.data]);const d=a==null?void 0:a.pages;return g==="loading"?e.jsxs("div",{className:"flex flex-col flex-1 justify-center items-center",children:[e.jsx(A,{className:"h-7 w-7 text-neutral-500 animate-spin my-3.5"}),e.jsx("p",{className:"text-xs",children:"Loading Messages..."})]}):g==="error"?e.jsxs("div",{className:"flex flex-col flex-1 justify-center items-center",children:[e.jsx(U,{className:"h-7 w-7 text-neutral-500 my-3.5"}),e.jsx("p",{className:"text-xs",children:"Server Error"})]}):e.jsxs("div",{ref:p,className:"flex-1 flex flex-col py-3.5 overflow-y-auto",children:[!o&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex-1"}),e.jsx(K,{type:"Channel",name:t.name})]}),o&&e.jsx("div",{className:"flex justify-center",children:n?e.jsx(A,{className:"h-6 w-6 text-neutral-600 animate-ping"}):e.jsx("button",{onClick:j,className:"text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition text-xs",children:"Load Previous Messages..."})}),e.jsx("div",{className:"flex flex-col-reverse mt-auto",children:d==null?void 0:d.map((r,b)=>{var u;return e.jsx(l.Fragment,{children:(u=r.data)==null?void 0:u.map((y,i)=>e.jsx(ge,{isLastMsg:r.data.length===i+1,hasClickedReply:m,onReply:N,channel:t,type:"Channel",message:y},y.id))},b)})}),e.jsx("div",{ref:s})]})},Ne=({isOpen:t,channel:f,onClose:h,user:m})=>{const{app_name:p}=S().props,[s,a]=l.useState(f),[c,o]=l.useState(!1);S().props;const n=l.useMemo(()=>route("server.channel.message.store",{server_id:(s==null?void 0:s.server_id)||"",channel_id:(s==null?void 0:s.id)||""}),[s]),g=l.useMemo(()=>route("server.channel.message.index",{server_id:(s==null?void 0:s.server_id)||"",channel_id:(s==null?void 0:s.id)||""}),[s]),j=ae(),[N,d]=l.useState(!1),v=x=>{o(!0),D.post(n,{message:x}).catch(()=>{E({title:"Internal Error",description:"Can't send message. Please try again!"}),o(!1)})};return l.useEffect(()=>{s&&window.Echo.join("channel_"+s.id.toString()).listen("NewChatMessageEvent",({message:x})=>{j.setQueryData([`channel_${s.id.toString()}`],r=>{const{pages:b}=r,u=b;return u[0]={...u[0],data:[x,...u[0].data]},{...r,pages:u}})}).listen("MessageUpdateEvent",({message:x})=>{j.setQueryData([`channel_${s.id.toString()}`],r=>{const{pages:b}=r,u=b;return u[0]={...u[0],data:u[0].data.map(i=>i.id!==x.id?i:x)},{...r,pages:u}})}).listen("CloseCaseEvent",x=>{s&&a(r=>({...r,is_closed:1}))})},[s==null?void 0:s.id,j]),!s||!m?null:e.jsxs(e.Fragment,{children:[e.jsx(T,{open:t,children:e.jsxs(I,{className:"w-full sm:w-[420px] h-full flex flex-col overflow-y-hidden space-y-2",children:[e.jsxs(q,{className:"h-auto",children:[e.jsx(z,{children:e.jsxs("div",{className:"flex items-center",children:[e.jsxs("p",{children:["Welcome to ",p]}),e.jsx("div",{className:"ml-auto",children:e.jsx(V,{})})]})}),e.jsx(H,{children:"You Are Now Connected to Chat Support. Please be patient while we assign an agent"})]}),e.jsx("hr",{}),e.jsx("div",{className:"flex-1 flex flex-col overflow-y-hidden",children:e.jsx("div",{className:"flex-1 mb-2 overflow-auto",children:e.jsx(ve,{hasClickedReply:c,onReply:v,getMsgsRoute:g,channel:s})})}),e.jsx("div",{className:"h-auto",children:s.is_closed!==1?e.jsx(J,{getMsgsRoute:g,apiRoute:n,type:"Channel",name:"Chat Support"}):e.jsxs(e.Fragment,{children:[e.jsx(W,{}),e.jsx("p",{className:"font-semibold text-lg tracking-tight",children:"This Case Has Been Closed. You Can Not Reply To This Thread Anymore"}),(s.rating<0||!(s!=null&&s.rating))&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"font-semibold text-lg tracking-tight",children:"Would You Like To Give a Feedback?"}),e.jsx(w,{onClick:()=>d(!0),children:"Give Feedback"})]}),s.rating>-1&&e.jsx("p",{className:"font-semibold text-lg tracking-tight",children:"Thank You For Your Feedback"})]})})]})}),e.jsx(be,{onFeedback:x=>{a(r=>({...r,rating:x}))},channel_id:s.id,isOpen:N,onClose:()=>d(!1)}),e.jsx(X,{})]})},be=({isOpen:t,onClose:f,channel_id:h,onFeedback:m})=>{const[p,s]=l.useState(0),[a,c]=l.useState(""),o=()=>{D.post(route("support.feedback"),{rating:p,channel_id:h,feedbackComment:a}).then(()=>{f(),m(p)}).catch(n=>E({description:"Something Went Wrong. Please try again",variant:"destructive"}))};return e.jsx(re,{open:t,children:e.jsxs(le,{children:[e.jsxs(ne,{children:[e.jsx(ie,{children:"Please rate us! "}),e.jsx(oe,{asChild:!0,children:e.jsxs(e.Fragment,{children:[e.jsx("p",{children:" We appreciate your feedback."}),e.jsxs("div",{style:{direction:"ltr",fontFamily:"sans-serif",touchAction:"none"},children:[e.jsx($,{allowHover:!1,transition:!0,SVGclassName:"inline-block",onClick:n=>s(n)}),e.jsxs("div",{className:"w-full",children:[e.jsx(Z,{className:"uppercase text-xs font-bold",children:"Feedback / Comment"}),e.jsx("textarea",{onChange:({target:n})=>c(n.value),className:"w-full border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 resize-none rounded-md dark:bg-zinc-700"})]})]})]})})]}),e.jsxs(ce,{children:[e.jsx(w,{onClick:f,size:"sm",variant:"outline",children:"Cancel"}),e.jsx(w,{onClick:o,size:"sm",children:"Proceed"})]})]})})},Re=({channel:t,user:f})=>{const{app_name:h}=S().props,{data:m,setData:p,post:s,get:a,processing:c,errors:o,reset:n}=F({name:"",email:"",password:"",password_confirmation:""}),g=d=>{d.preventDefault(),s(route("support.enter"),{preserveState:!1,onError:v=>{console.error(v)}})},[j,N]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(R,{title:"Welcome to "}),e.jsxs("div",{className:"flex flex-col h-screen",children:[e.jsx("header",{className:"bg-white dark:bg-gray-800 text-primary py-4 text-center md:text-left shadow-md",children:e.jsxs("div",{className:"container flex items-center",children:[e.jsxs("h1",{className:"text-xl font-extrabold w-full flex items-center",children:[e.jsx(fe,{className:"mr-4"}),e.jsx("span",{children:h})]}),e.jsx("button",{onClick:()=>N(!0),className:"bg-primary rounded text-secondary text-sm w-28 p-2",children:"Login"})]})}),e.jsx("section",{className:"py-10 bg-gray-300 dark:bg-gray-700 flex-1",children:e.jsxs("div",{className:"container flex flex-col-reverse md:flex-row items-center",children:[e.jsxs("div",{className:`w-full p-5 bg-gray-100/50 dark:bg-gray-600 rounded-md shadow-md
                                    md:w-1/3`,children:[e.jsx("h1",{className:"font-bold",children:"For inquiry or support"}),e.jsx("p",{className:"text-sm mt-1 mb-5",children:"Send us a message by providing contact details"}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"grid flex-1 gap-2 mb-4",children:[e.jsx(_,{htmlFor:"name",children:"Name:"}),e.jsx(k,{required:!0,autoFocus:!0,autoComplete:"off",disabled:c,value:m.name,onChange:({target:d})=>p("name",d.value),id:"name",className:"dark:bg-gray-700"}),o.email&&e.jsx("span",{children:o.name})]}),e.jsxs("div",{className:"grid flex-1 gap-2",children:[e.jsx(_,{htmlFor:"email",children:"Email:"}),e.jsx(k,{required:!0,type:"email",autoComplete:"off",disabled:c,value:m.email,onChange:({target:d})=>p("email",d.value),id:"email",className:"dark:bg-gray-700"}),o.email&&e.jsx("span",{children:o.email})]}),e.jsx("div",{className:"flex items-center justify-center mt-4",children:e.jsx(w,{className:"ml-4",disabled:c,children:"Send Message"})})]})]}),e.jsx("div",{className:"mb-5 md:mb-0 md:ml-auto",children:e.jsx("img",{src:`${route("landing")}/images/school.svg`,className:"w-full h-[15rem] md:h-[30rem]"})})]})})]}),e.jsx(Ne,{isOpen:!!t,onClose:()=>{},channel:t,user:f}),e.jsx(ye,{openLogin:j,onClose:()=>N(!1)})]})},ye=({openLogin:t,onClose:f})=>{const{data:h,setData:m,post:p,processing:s,errors:a,reset:c}=F({email:"",password:"",remember:!1});l.useEffect(()=>()=>{c("password")},[]);const o=n=>{n.preventDefault(),p(route("login"),{onSuccess:()=>P.get(route("home"))})};return e.jsx(de,{open:t,onOpenChange:f,children:e.jsxs(me,{className:"sm:max-w-[425px]",children:[e.jsx(xe,{}),e.jsx(ue,{}),e.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[e.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[e.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Sign In"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email and password"})]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("form",{onSubmit:o,children:[(a.email||a.password)&&e.jsxs(ee,{variant:"destructive",className:"mb-6",children:[e.jsx(he,{className:"h-4 w-4"}),e.jsx(se,{children:"Error"}),e.jsxs(te,{className:"flex flex-col space-y-1.5",children:[e.jsx("span",{children:a==null?void 0:a.email}),e.jsx("span",{children:a==null?void 0:a.password})]})]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx(_,{htmlFor:"email",children:"Email"}),e.jsx(k,{required:!0,id:"email",placeholder:"name@example.com",type:"text",autoCapitalize:"none",autoComplete:"off",autoCorrect:"off",disabled:s,onChange:({target:n})=>m("email",n.value)})]}),e.jsxs("div",{className:"grid gap-1.5",children:[e.jsx(_,{htmlFor:"password",children:"Password"}),e.jsx(k,{required:!0,id:"password",placeholder:"password",type:"password",autoCapitalize:"none",autoComplete:"off",autoCorrect:"off",disabled:s,onChange:({target:n})=>m("password",n.value)})]}),e.jsxs(w,{disabled:s,children:[s&&e.jsx(pe,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign In"]})]})]}),e.jsx("div",{className:"relative",children:e.jsx("div",{className:"absolute inset-0 flex items-center"})})]})]})]})})};export{Re as default};
