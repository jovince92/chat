import { useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';
import { useModal } from '@/Hooks/useModalStore';
import EmojiPicker from '../EmojiPicker';
import axios from 'axios';
import { useChatQuery } from '@/Hooks/useChatQuery';
import { PageProps } from '@/types';

interface ChatInputProps{
    apiRoute:string;
    name:string;
    type:"Channel"|"Conversation";
    getMsgsRoute:string;
}

const ChatInput:FC<ChatInputProps> = ({apiRoute,name,type,getMsgsRoute}) => {
    const {current_channel} = usePage<PageProps>().props;
    const [sending,setSending]=useState(false);
    //const {fetchNextPage} = useChatQuery({queryRoute:getMsgsRoute,queryKey:`channel_${current_channel?.id.toString()}`,value:"0"});
    const [message,setMsg]=useState("");
    const {onOpen} = useModal();
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();

        if(!message||message.length<1){
            return toast({description:'Input Message',variant:'destructive'});
        }
        setSending(true);
        axios.post(apiRoute,{
            message
        })
        .then(()=>{
            setMsg("");
            //if(!!current_channel) fetchNextPage();
        })
        .catch(()=>toast({title:'Internal Error',description:`Can't send message. Please try again!`}))
        .finally(()=>setSending(false));


    }


    return (
        <form onSubmit={onSubmit}>
            <div className='relative'>
                <button disabled={sending} type='button' onClick={()=>onOpen('MessageFile',{apiRoute})} className='absolute top-2 left-3 h-6 w-6 bg-neutral-500 dark:bg-neutral-400 hover:bg-neutral-600 dark:hover:bg-neutral-300 transition rounded-full p-1 flex items-center justify-center'>
                    <Plus className='text-white dark:text-neutral-900' />
                </button>
                <Input placeholder={`Send to ${type==='Conversation'?name:'#'+name}`} value={message} onChange={({target})=>setMsg(target.value)} disabled={sending} className='px-12 py-5 bg-neutral-200/90 dark:bg-neutral-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200'  />
                <div className='absolute top-2 right-3'>
                    <EmojiPicker   onChange={(emoji:string)=>setMsg(val=>`${val} ${emoji}`)} />
                </div>
            </div>
        </form>
    )
}

export default ChatInput
