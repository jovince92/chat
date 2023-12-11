import { RefObject, useEffect, useState } from "react"

type ChatScrollProps = {
    chatRef:RefObject<HTMLDivElement>;
    bottomRef:RefObject<HTMLDivElement>;
    shouldLoadMore:boolean;
    loadMore:()=>void;
    count:number;
}

export const useChatScroll = (props:ChatScrollProps) =>{
    const {chatRef,
        bottomRef,
        shouldLoadMore,
        loadMore,
        count,
    }=props;
    const [hasInitialized,setHasInitialized] = useState(false);
    useEffect(()=>{
        const topDiv = chatRef.current;
        const handleScroll = () =>{
            const scrollTop = topDiv?.scrollTop;
            if(scrollTop===0 && shouldLoadMore){
                loadMore();
            }
        }
        topDiv?.addEventListener('scroll',handleScroll);
        return ()=>topDiv?.removeEventListener('scroll',handleScroll);
    },[shouldLoadMore,loadMore,chatRef]);

    useEffect(()=>{
        // const bottomDiv = bottomRef.current;
        // const topDiv = chatRef.current;

        // const shouldAutoScroll = () =>{
        //     if(!hasInitialized && bottomDiv){
        //         setHasInitialized(true);
        //         return true;
        //     }
        //     if(!topDiv){
        //         return false;
        //     }

        //     const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
        //     return distanceFromBottom <=100;
        // }

        if(true){
            setTimeout(()=>bottomRef.current?.scrollIntoView({
                behavior:'smooth'
            }),100);
        }

        // if(true){
        //     setTimeout(()=>bottomRef.current?.scrollIntoView({
        //         behavior:'smooth'
        //     }),100);
        // }

        // console.log(shouldAutoScroll());

    },[bottomRef,count]);
}
