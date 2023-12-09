import { PageProps, Server, User } from '@/types';
import { Hash, Lock, User2,  } from 'lucide-react';
import React, { FC } from 'react'
import MobileToggle from '../MobileToggle';
import UserAvatar from '../UserAvatar';
import WebSocketIndicator from '../WebSocketIndicator';
import ChatVideoButton from './ChatVideoButton';
import { Channel } from '../../types/index';

interface ChatHeaderProps{
    server:Server;
    name:string;
    type:"Channel"|"Conversation";
    user?:User;
    channel?:Channel;
}

const ChatHeader:FC<ChatHeaderProps> = ({server,name,type,user,channel}) => {
    return (
        <div className='text-md font-semibold px-2.5 flex items-center h-12 border-b-2 border-secondary z-0'>
            <MobileToggle />
            {
                channel?.is_closed===1?
                    <Lock className='w-5 h-5 text-neutral-500 dark:text-neutral-400 mr-1.5' />
                    :
                    <User2 className='w-5 h-5 text-neutral-500 dark:text-neutral-400 mr-1.5' />
            }
            {
                type==='Conversation' && <UserAvatar className='h-8 w-8 mr-2' user={user} />
            }
            <p className='font-semibold text-base text-black dark:text-white'>{name}</p>
            <div className='ml-auto flex items-center'>
                {
                    type==='Conversation'&&<ChatVideoButton />
                }
                <WebSocketIndicator />
            </div>
        </div>
    )
}

export default ChatHeader
