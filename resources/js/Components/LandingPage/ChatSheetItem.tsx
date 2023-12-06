import { Channel, Message, PageProps } from '@/types';
import {FC,FormEventHandler,useEffect,useMemo, useState,useRef, useCallback} from 'react';
import UserAvatar from '../UserAvatar';
import ActionTooltip from '../Layouts/ActionToolTip';
import { useForm, usePage } from '@inertiajs/react';
import { ROLEICONMAP } from '../Layouts/ServerIdLayout/ServerSidebar';
import {format} from 'date-fns'
import { cn } from '@/lib/utils';
import { Edit, Trash } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useModal } from '@/Hooks/useModalStore';
interface ChatItemProps{
    message:Message;
    type:"Channel"|"Conversation";
    channel:Channel;
    onReply?:(reply:string)=>void
}

const DATE_FORMAT = "d MMMM yyyy HH:mm"

const ChatSheetItem:FC<ChatItemProps> = ({message,type,channel,onReply}) => {
    //const [hasClickedReply,setHasClickedReply]   = useState(false);
    const {replies} = usePage<PageProps>().props;
    const [newContent,setNewContent] = useState(message.content);
    const [loading,setLoading]  = useState(false);
    const [isEditing,setIsEditing]  = useState(false);
    const {user} = message;
    const fileType=message.file?.split(".").pop();
    
    const fileImage = fileType==='pdf'?route('home')+'/uploads/pdf/pdf.png':message.file;
    
    const input = useRef<HTMLInputElement>(null);

    const {post} =useForm({user_id:message.user_id});
    
    const onSubmit:FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        
        setLoading(true);
        

        axios.post(route('server.channel.message.update',{
            server_id:channel.server_id,
            channel_id:channel.id
        }),{
            message:newContent,
            message_id:message.id
        })
        .then(()=>setIsEditing(false))
        .catch(()=>toast({title:'Internal Error',description:'Please Try Again'}))
        .finally(()=>setLoading(false));
    },[channel,newContent,message.id,type]);


    useEffect(()=>{
        
        if(input.current){
            input.current.focus();
        }
        const handleKeyDown = (e:KeyboardEvent) =>{
            if(e.key==='Escape'||e.code==='Escape'){
                setIsEditing(false);
            }
        }
        window.addEventListener('keydown',handleKeyDown);
        return () => window.removeEventListener('keydown',handleKeyDown);
    },[]);



    const onClick = (reply:string) =>{
        if(onReply) onReply(reply);
    } 

    useEffect(()=>{
        if(input.current&&isEditing){
            input.current.focus();
        }
    },[input,isEditing]);

    return (
        <div className='relative group flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-900 p-3.5 transition w-full'>
            <div className='group flex gap-x-1.5 items-start w-full'>
                <div  className='cursor-pointer hover:drop-shadow-md transition'>
                    {message.is_system_msg===0?
                        <UserAvatar user={user} />
                        :
                        ''
                    }
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-x-1.5'>
                        <div className='flex items-center'>
                            {message.is_system_msg===0?
                                <>
                                    <p  className={cn('font-semibold text-sm transition')}>
                                        {user.name}
                                    </p>
                                    <ActionTooltip label={'Admin'}>
                                        <p>{ROLEICONMAP['ADMIN']}</p>
                                    </ActionTooltip>
                                </>
                                :
                                <p  className={cn('font-semibold text-sm transition')}>
                                    System
                                </p>
                            }

                        </div>
                        <span className='text-xs text-neutral-500 dark:text-neutral-400'>{format(new Date(message.created_at),DATE_FORMAT)}</span>
                    </div>
                    {
                        (message.file&&!message.deleted_at)&&(
                            <a href={message.file} target='_blank' rel='noopener noreferrer' className={cn('relative aspect-square rounded-md mt-1.5 overflow-hidden border flex items-center bg-secondary ',
                                fileType==='pdf'?'h-10 w-10':'h-48 w-48')}  >
                                <img src={fileImage} alt='file' className='object-cover' />
                            </a>
                        )
                    }
                    <p className={cn('text-xs',fileType==='pdf'&&!message.deleted_at?'block':'hidden')}>PDF File</p>
                    {
                        ( !isEditing) && (
                            <p className={cn('text-sm my-4 text-neutral-600 dark:text-neutral-300',
                                message.deleted_at && 'italic text-neutral-500 dark:text-neutral-400 text-xs mt-1')}>
                                {!message.deleted_at?message.content:'Message Deleted'}
                                {
                                    ((message.created_at!==message.updated_at)&&!message.deleted_at) &&(
                                        <span className='text-[0.625rem] mx-1.5 text-neutral-500 dark:text-neutral-400'>
                                            (edited)
                                        </span>
                                    )
                                }
                            </p>
                        )
                    }
                    {
                        (!message.file && isEditing) && (
                            <>
                                <form className='flex items-center w-full gap-x-1.5 pt-1.5' onSubmit={onSubmit}>
                                    <div className='flex-1'>
                                        <Input disabled={loading} ref={input} value={newContent} onChange={({target})=>setNewContent(target.value)} className='p-1.5 bg-neutral-200/90 dark:bg-neutral-700/75 border-none !border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 text-neutral-600 dark:text-neutral-200' />
                                    </div>
                                    <Button size='sm' disabled={loading} >Save</Button>
                                </form>
                                <span className='text-[0.625rem] mt-1 text-neutral-400'>
                                    Press ESC to cancel. Press Enter to save.
                                </span>
                            </>
                        )
                    }
                    {
                        message.is_system_msg===1 && (
                            <div className='w-full grid grid-cols-2 gap-3 pb-3.5'>
                                {
                                    replies.map(reply=><Button variant='outline' size='sm' onClick={()=>onClick(reply)}>{reply}</Button>)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatSheetItem;