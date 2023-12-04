import { useChatQuery } from '@/Hooks/useChatQuery';
import { useChatScroll } from '@/Hooks/useChatScroll';
import { Channel, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Loader2, ServerCrashIcon } from 'lucide-react';
import React, { FC, Fragment, useRef } from 'react'
import ChatWelcome from '../Chat/ChatWelcome';
import ChatItem from '../Chat/ChatItem';
import ChatSheetItem from './ChatSheetItem';

const ChatSheetMessages:FC<{channel:Channel;getMsgsRoute:string;}> = ({channel,getMsgsRoute}) => {
    
    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useChatQuery({queryRoute:getMsgsRoute,queryKey:`channel_${channel.id.toString()}`,value:"0"});
    const  loadPreviousMsgs= () =>{
        if(!data?.pages){
            return null;
        }
        
        fetchNextPage();
    }

    useChatScroll({
        chatRef,bottomRef,loadMore:loadPreviousMsgs,shouldLoadMore:!isFetchingNextPage && !!hasNextPage,count:data?.pages?.[0]?.data.length ??0
    });
    
    const paginatedMessages=data?.pages;
    

    
    
    if(status==='loading'){
        return(
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-neutral-500 animate-spin my-3.5' />
                <p className='text-xs'>Loading Messages...</p>
            </div>
        );
    }

    if(status==='error'){
        return(
            <div className='flex flex-col flex-1 justify-center items-center'>
                <ServerCrashIcon className='h-7 w-7 text-neutral-500 my-3.5' />
                <p className='text-xs'>Server Error</p>
            </div>
        );
    }
    
    return (
        <div ref={chatRef} className='flex-1 flex flex-col py-3.5 overflow-y-auto'>
            {
                !hasNextPage&&(
                    <>
                        <div className='flex-1' />
                        <ChatWelcome type='Channel' name={channel.name} />
                    </>
                )
            }
            {
                hasNextPage && (
                    <div className='flex justify-center'>
                        {
                            isFetchingNextPage?<Loader2 className='h-6 w-6 text-neutral-600 animate-ping' />:(
                                <button onClick={loadPreviousMsgs} className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition text-xs'>Load Previous Messages...</button>
                            )
                        }
                    </div>
                )
            }
            <div className='flex flex-col-reverse mt-auto'>
                {
                    paginatedMessages?.map((paginatedmessage,_idx)=>(
                        <Fragment key={_idx}>
                            {
                                paginatedmessage.data?.map(message=>(
                                    <ChatSheetItem channel={channel} type='Channel' key={message.id} message={message} />
                                ))
                            }
                        </Fragment>
                    ))
                }
                
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatSheetMessages