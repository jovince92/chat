import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Channel, Message, PageProps, PaginatedMessage, User } from '@/types';
import ChatMessages from '../Chat/ChatMessages';
import ChatInput from '../Chat/ChatInput';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import QueryProvider from '@/Providers/QueryProvider';
import ChatSheetMessages from './ChatSheetMessages';
import { Button } from '../ui/button';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { Separator } from '../ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Rating } from 'react-simple-star-rating'
import ModalProvider from '@/lib/ModalProvider';
interface Props{
    isOpen?:boolean;
    channel?:Channel;
    onClose:()=>void;
    user?:User;
}

const ChatSheet:FC<Props> = ({isOpen,channel:OriginalChannel,onClose,user}) => {
    const [channel,setChannel] = useState(OriginalChannel);
    const [hasClickedReply,setHasClickedReply]   = useState(false);
    const {replies} = usePage<PageProps>().props;
    const apiRoute=useMemo(()=>
        route('server.channel.message.store',{server_id:channel?.server_id||"",channel_id:channel?.id||""})
    ,[channel]);

    const getMsgsRoute=useMemo(()=>
        route('server.channel.message.index',{server_id:channel?.server_id||"",channel_id:channel?.id||""})
    ,[channel]);
    
    const queryClient = useQueryClient();


    const [showFeedbackModal,setShowFeedbackModal] = useState(false);

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
        }).listen('CloseCaseEvent',(e:{channel:Channel})=>{
            if(!channel) return;
            setChannel(val=>({...val!,is_closed:1}))
        });


        //return ()=>window.Echo.leaveAllChannels();
    },[channel?.id,queryClient]);
    if(!channel || !user) return null;

    return (
        <>
            
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
                    {
                        channel.is_closed!==1?<ChatInput apiRoute={apiRoute} type='Channel' name='Chat Support' />:(
                            <>
                                <Separator />
                                <p className='font-semibold text-lg tracking-tight'>
                                    This Case Has Been Closed. You Can Not Reply To This Thread Anymore
                                </p>
                                {
                                    channel.rating<0?(
                                        <>
                                            <p className='font-semibold text-lg tracking-tight'>
                                                Would You Like To Give a Feedback?
                                            </p>
                                            
                                            <Button onClick={()=>setShowFeedbackModal(true)}>Give Feedback</Button>
                                        </>
                                    ):(
                                        <p className='font-semibold text-lg tracking-tight'>Thank You For Your Feedback</p>
                                    )
                                }
                                
                            </>
                        )
                        
                    }
                </SheetContent>
            </Sheet>
            <FeedbackModal onFeedback={(rating)=>{setChannel(val=>({...val!,rating}))}} channel_id={channel.id} isOpen={showFeedbackModal} onClose={()=>setShowFeedbackModal(false)} />
            <ModalProvider />
        </>
    )
}

export default ChatSheet;

interface FeedbackModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    channel_id:number;
    onFeedback:(rating:number)=>void;
}

const FeedbackModal:FC<FeedbackModalProps> = ({isOpen,onClose,channel_id,onFeedback}) =>{
    const [rating,setRating] = useState(0);

    const giveFeedback = () =>{
        axios.post(route('support.feedback'),{
            rating,
            channel_id
        }).then(()=>{
            onClose();
            onFeedback(rating);
        })
        .catch(e=>toast({description:'Something Went Wrong. Please try again',variant:'destructive'}))
    }

    return(
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Please rate us! </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <>
                            <p> We appreciate your feedback.</p>
                            <div
                                style={{
                                    direction: 'ltr',
                                    fontFamily: 'sans-serif',
                                    touchAction: 'none'
                                }}
                                >
                                <Rating allowHover={false} transition SVGclassName='inline-block' onClick={e=>setRating(e)} />
                            </div>
                        </>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            
                <AlertDialogFooter>
                        <Button onClick={onClose} size='sm' variant='outline'>Cancel</Button>
                    
                        <Button  onClick={giveFeedback} size='sm'>Proceed</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

