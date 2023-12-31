import { PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import {FC,  Fragment,  useEffect,  useRef, useState} from 'react'
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '@/Hooks/useChatQuery';
import { Loader2, ServerCrash } from 'lucide-react';
import ChatItem from './ChatItem';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface ChatMessagesProps{
    getMsgsRoute:string;
    type:"Channel"|"Conversation";
}

const ChatMessages:FC<ChatMessagesProps> = ({getMsgsRoute,type}) => {

    const {current_channel,auth} = usePage<PageProps>().props;

    if(!current_channel){
        return null;
    }
    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const [autoScroll,setAutoScroll] = useState(true);
    const { data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useChatQuery({queryRoute:getMsgsRoute,queryKey:`channel_${current_channel.id.toString()}`,value:"0"});
    const  loadPreviousMsgs= () =>{
        if(!data?.pages){
            return null;
        }

        fetchNextPage();
    }


    const paginatedMessages=data?.pages;




    useEffect(() => {        
        if(!autoScroll) return;
        setTimeout(()=>bottomRef.current?.scrollIntoView({
            behavior:'smooth',
            block: 'center'
        }),100);
    }, [bottomRef,data?.pages?.[0]?.data]);

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
                <ServerCrash className='h-7 w-7 text-neutral-500 my-3.5' />
                <p className='text-xs'>Server Error</p>
            </div>
        );
    }




    return (
        <>
            <div className='fixed top-14 right-3  flex items-center space-x-2 z-50'>
                <Switch checked={autoScroll} onCheckedChange={()=>setAutoScroll(!autoScroll)} id="autoscroll" />
                <Label htmlFor="autoscroll">Auto Scroll</Label>
            </div>
            <div ref={chatRef} className='flex-1 flex flex-col py-3.5 overflow-y-auto'>
                {
                    !hasNextPage&&(
                        <>
                            <div className='flex-1' />
                            <ChatWelcome type={type} name={current_channel.name} />
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
                                        <ChatItem type={type} key={message.id} message={message} />
                                    ))
                                }
                            </Fragment>
                        ))
                    }
                </div>

                <div className='p-8' hidden={(current_channel.feedback_comment)?false:true}>
                    <div className='p-4 bg-gray-200 dark:bg-gray-700 rounded-md'>
                        <p className='font-bold mb-4'>USER FEEDBACK / COMMENT</p>
                        <p className='bg-gray-200 dark:bg-gray-700 text-sm'>{current_channel.feedback_comment}</p>
                    </div>
                </div>

                <div ref={bottomRef} />
            </div>
        </>
    )
}

export default ChatMessages
