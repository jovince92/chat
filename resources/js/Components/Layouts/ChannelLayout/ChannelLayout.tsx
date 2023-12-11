import { Message, PageProps, PaginatedMessage } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC,  useEffect,  useMemo } from 'react'
import ChatHeader from '../../Chat/ChatHeader';
import ChatInput from '@/Components/Chat/ChatInput';
import ChatMessages from '@/Components/Chat/ChatMessages';
import MediaRoom from '@/Components/MediaRoom';
import { useQueryClient } from '@tanstack/react-query';

interface ChannelLayoutProps{

}

const ChannelLayout:FC<ChannelLayoutProps> = () => {

    
    const {current_server,current_channel,auth} = usePage<PageProps>().props;
    const queryClient = useQueryClient();
    
    useEffect(()=>{
        
        if(!current_channel){return;}
        window.Echo.join('channel_'+current_channel.id.toString())
        .listen('NewChatMessageEvent',({message}:{message:Message})=>{
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any)=>{
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
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any)=>{
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
    },[current_channel?.id,queryClient]);
    if(!current_channel){
        return null;
    }
    const apiRoute=useMemo(()=>route('server.channel.message.store',{server_id:current_server.id,channel_id:current_channel.id}),[current_server.id,current_channel.id]);
    const getMsgsRoute=useMemo(()=>route('server.channel.message.index',{server_id:current_server.id,channel_id:current_channel.id}),[current_server.id,current_channel.id]);



    return (
        <div className='bg-white dark:bg-neutral-950 flex flex-col h-full'>
            <ChatHeader name={current_channel.name} server={current_server} channel={current_channel} type='Channel' />
            {
                current_channel.type==='TEXT' &&(
                    <>
                        <ChatMessages getMsgsRoute={getMsgsRoute} type='Channel' />
                        <ChatInput getMsgsRoute={getMsgsRoute} name={current_channel.name} type='Channel' apiRoute={apiRoute}  />
                    </>
                )
            }
            {
                current_channel.type==='AUDIO' && <MediaRoom chat_id={current_channel.id.toString()} audio />
            }
            {
                current_channel.type==='VIDEO' && <MediaRoom chat_id={current_channel.id.toString()} video />
            }
        </div>
    )
}

export default ChannelLayout
