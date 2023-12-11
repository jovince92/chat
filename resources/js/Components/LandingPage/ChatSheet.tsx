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
import MessageFileModal from '../Modals/MessageFileModal';
import { Label } from '@radix-ui/react-label';
import ModeToggle from '../ModeToggle';
interface Props{
    isOpen?:boolean;
    channel?:Channel;
    onClose:()=>void;
    user?:User;
}

const ChatSheet:FC<Props> = ({isOpen,channel:OriginalChannel,onClose,user}) => {
    const {app_name} = usePage<PageProps>().props;
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
        setHasClickedReply(true);
        axios.post(apiRoute,{
            message:reply,
        })
        .catch(()=>{
            toast({title:'Internal Error',description:`Can't send message. Please try again!`});
            setHasClickedReply(false);
        })
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
                <SheetContent className='w-full sm:w-[420px] h-full flex flex-col overflow-y-hidden space-y-2'>
                    <SheetHeader className='h-auto'>
                        <SheetTitle>
                            <div className='flex items-center'>
                                <p>Welcome to {app_name}</p>
                                <div className='ml-auto'>
                                    <ModeToggle/>
                                </div>
                            </div>
                        </SheetTitle>
                        <SheetDescription>
                            You Are Now Connected to Chat Support. Please be patient while we assign an agent
                        </SheetDescription>
                    </SheetHeader>
                    <hr />
                    <div className='flex-1 flex flex-col overflow-y-hidden'>
                        <div className='flex-1 mb-2 overflow-auto'>
                            <ChatSheetMessages hasClickedReply={hasClickedReply} onReply={onReply} getMsgsRoute={getMsgsRoute} channel={channel} />
                        </div>
                    </div>
                    <div className='h-auto'>
                        {
                            channel.is_closed!==1?<ChatInput apiRoute={apiRoute} type='Channel' name='Chat Support' />:(
                                <>
                                    <Separator />
                                    <p className='font-semibold text-lg tracking-tight'>
                                        This Case Has Been Closed. You Can Not Reply To This Thread Anymore
                                    </p>
                                    {
                                        (channel.rating<0||!channel?.rating)&&(
                                            <>
                                                <p className='font-semibold text-lg tracking-tight'>
                                                    Would You Like To Give a Feedback?
                                                </p>

                                                <Button onClick={()=>setShowFeedbackModal(true)}>Give Feedback</Button>
                                            </>
                                        )
                                    }
                                    {
                                        channel.rating>-1&&(
                                            <p className='font-semibold text-lg tracking-tight'>Thank You For Your Feedback</p>
                                        )
                                    }

                                </>
                            )

                        }
                    </div>
                </SheetContent>
            </Sheet>
            <FeedbackModal onFeedback={(rating)=>{setChannel(val=>({...val!,rating}))}} channel_id={channel.id} isOpen={showFeedbackModal} onClose={()=>setShowFeedbackModal(false)} />

            <MessageFileModal />
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
    const [feedbackComment,setFeedbackComment] = useState("");

    const giveFeedback = () =>{
        axios.post(route('support.feedback'),{
            rating,
            channel_id,
            feedbackComment,
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

                                <div className='w-full'>
                                    <Label className='uppercase text-xs font-bold'>Feedback / Comment</Label>
                                    <textarea onChange={({target})=>setFeedbackComment(target.value)}
                                        className='w-full border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 resize-none rounded-md dark:bg-zinc-700' />
                                </div>
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

