import React, { FC, useEffect, useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Channel, Message, PageProps, PaginatedMessage, User } from '@/types';
import ChatMessages from '../Chat/ChatMessages';
import ChatInput from '../Chat/ChatInput';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import QueryProvider from '@/Providers/QueryProvider';
import ChatSheetMessages from './ChatSheetMessages';
import { Button } from '../ui/button';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { toast } from '../ui/use-toast';

interface Props{
    isOpen?:boolean;
    channel?:Channel;
    onClose:()=>void;
    user?:User;
}

const ChatSheet:FC<Props> = ({isOpen,channel,onClose,user}) => {
    const [hasClickedReply,setHasClickedReply]   = useState(false);
    const {replies} = usePage<PageProps>().props;
    const apiRoute=useMemo(()=>
        route('server.channel.message.store',{server_id:channel?.server_id||"",channel_id:channel?.id||""})
    ,[channel]);

    const getMsgsRoute=useMemo(()=>
        route('server.channel.message.index',{server_id:channel?.server_id||"",channel_id:channel?.id||""})
    ,[channel]);
    
    const queryClient = useQueryClient();

    const onReply = (reply:string)=>{
        
        axios.post(apiRoute,{
            message:reply,
        })
        .then(()=>setHasClickedReply(true))
        .catch(()=>toast({title:'Internal Error',description:`Can't send message. Please try again!`}))
        //.finally(()=>setSending(false));
    }

    useEffect(()=>{
        if(!channel){return;}
        window.Echo.join('channel_'+channel.id.toString())
        .listen('NewChatMessageEvent',({message}:{message:Message})=>{
            queryClient.setQueryData([`channel_${channel.id.toString()}`],(oldData:any)=>{
                const {pages}=oldData as {pages:PaginatedMessage[]};
                
                const  newData=pages;
                newData[0]={
                    ...newData[0],
                    data:[message,...newData[0].data]
                }
                const updated={...oldData,pages:newData};
                return updated;
            });
        })
        .listen('MessageUpdateEvent',({message}:{message:Message})=>{
            queryClient.setQueryData([`channel_${channel.id.toString()}`],(oldData:any)=>{
                const {pages}=oldData as {pages:PaginatedMessage[]};
                
                const  newData=pages;
                newData[0]={
                    ...newData[0],
                    data:newData[0].data.map((oldMsg)=>oldMsg.id!==message.id?oldMsg:message)
                }
                const updated={...oldData,pages:newData};
                return updated;
            });
        });
        return ()=>window.Echo.leaveAllChannels();
    },[channel?.id,queryClient]);
    if(!channel || !user) return null;

    return (
        
        <Sheet open={isOpen}>
            <SheetContent className='h-full flex flex-col overflow-y-hidden space-y-2'>
                <SheetHeader className='h-auto'>
                    <SheetTitle>Welcome to Chat Support</SheetTitle>
                    <SheetDescription>
                        You Are Now Connected to Chat Support. Please be patient while we assign an agent
                    </SheetDescription>
                </SheetHeader>
                <div className='flex-1 flex flex-col overflow-y-hidden'>
                    <div className='flex-1 mb-2'>
                        <ChatSheetMessages onReply={onReply} getMsgsRoute={getMsgsRoute} channel={channel} />
                    </div>
                    
                    
                </div>
                <ChatInput apiRoute={apiRoute} type='Channel' name='Chat Support' />
            </SheetContent>
        </Sheet>
        
    )
}

export default ChatSheet