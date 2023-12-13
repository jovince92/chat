import { cn } from '@/lib/utils';
import { Channel, MemberRole, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import { Check, CheckIcon, Edit, FileLock, FolderLock, Hash, Lock, LockIcon, Mic, Trash, User, Video } from 'lucide-react';
import React, { FC, MouseEventHandler } from 'react'
import ActionTooltip from '../ActionToolTip';
import { useModal } from '@/Hooks/useModalStore';
import { Rating } from 'react-simple-star-rating';

interface ServerChannelProps{
    channel:Channel;
    role?:MemberRole;
}

const ICONMAP = {
    'TEXT':Hash,
    'AUDIO':Mic,
    'VIDEO':Video
}

const ServerChannel:FC<ServerChannelProps> = ({channel,role}) => {
    const Icon=ICONMAP[channel.type];
    const {current_server,current_channel} = usePage<PageProps>().props;
    const {onOpen} = useModal();

    return (
        <button onClick={()=>router.get(route('server.channel.index',{server_id:current_server.id,channel_id:channel.id}))} className={cn('group p-1.5 rounded-md flex items-center gap-x-1.5 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1',
                current_channel?.id===channel.id&&"bg-neutral-700/20 dark:bg-neutral-700"
            )}>

            {/* CHANNEL ICON */}
            {
                channel.is_closed===1?
                <ActionTooltip label='Case Closed'>
                    <CheckIcon className='text-green-400'/>
                </ActionTooltip>
                :
                <User/>
            }

            <p className={cn('flex flex-col space-y-1 text-sm text-left text-neutral-800 group-hover:text-neutral-950 dark:text-neutral-100 dark:group-hover:text-neutral-300 transition',
                    current_channel?.id===channel.id&&"text-primary dark:text-neutral-200 dark:group-hover:text-white"
                )}>
                <span className='w-32 truncate text-sm'>{channel.user.name}</span>
                <span className='w-32 truncate text-xs'>{channel.user.email}</span>
                { channel.rating>0 && <Rating initialValue={channel.rating} SVGclassName='inline-block' readonly size={17} />}
            </p>
            {
                (channel.name !=='general' && role!=='GUEST')&&(
                    <div className='ml-auto flex items-center gap-x-1.5'>
                        {/* <ActionTooltip label='Edit'>
                            <Edit onClick={(e)=>{e.stopPropagation();onOpen('EditChannel',{channel})}} className='hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
                        </ActionTooltip> */}
                        {
                            channel.is_closed===1?
                            <></>
                            :(
                            <ActionTooltip label='Close Case'>
                                <Check onClick={(e)=>{e.stopPropagation();onOpen('CaseClosed',{channel})}} className='hidden group-hover:block w-4 h-4 text-green-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
                            </ActionTooltip>
                            )
                        }

                        <ActionTooltip label='Delete'>
                            <Trash onClick={(e)=>{e.stopPropagation();onOpen('DeleteChannel',{channel})}} className='hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
                        </ActionTooltip>
                    </div>
                )
            }
            {channel.name==='general' && <Lock className='ml-auto w-4 h-4 text-neutral-500 dark:text-neutral-400' />}
        </button>
    )
}

export default ServerChannel
