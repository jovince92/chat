import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { useModal } from '@/Hooks/useModalStore';
import { MemberRole, Server, PageProps } from '@/types'
import { ChevronDown, LogOut, MessageCircle, PlusCircle, Settings, Settings2, Trash, UserPlus, Users } from 'lucide-react';
import UserAvatar from '../../UserAvatar';
import { usePage,router } from '@inertiajs/react';
import React, { FC } from 'react'

interface ServerHeaderProps{
    role:MemberRole;
    server:Server;
}

const ServerHeader:FC<ServerHeaderProps> = ({role,server}) => {
    const {auth,servers,current_server} = usePage<PageProps>().props;
    const {user}=auth;

    const isAdmin= role==='ADMIN';
    const isMod = isAdmin||role==='MODERATOR';
    const {onOpen} = useModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:!outline-none' asChild>
                <button className='w-full text-base font-semibold px-2.5 flex items-center h-14 bg-white dark:bg-zinc-700 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition shadow'>
                    <UserAvatar user={user} className='mr-2' />
                    <p>{user.name}</p>
                    <ChevronDown className='h-5 w-5 ml-auto' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[0.125rem]'>
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>setTimeout(() => onOpen('Profile',{server}), 100)} className='px-2.5 py-1.5 text-sm cursor-pointer'>Profile Settings<Settings2 className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    // isMod&&<DropdownMenuItem onClick={()=>onOpen('Invite',{server})} className='text-indigo-600 dark:text-indigo-400 px-2.5 py-1.5 text-sm cursor-pointer'>Invite People <UserPlus className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    // isAdmin&&<DropdownMenuItem onClick={()=>onOpen('EditServer',{server})}  className='px-2.5 py-1.5 text-sm cursor-pointer'>Server Settings <Settings className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>setTimeout(() => onOpen('Members',{server}), 100)} className='px-2.5 py-1.5 text-sm cursor-pointer'>Manage Members<Users className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>setTimeout(() => onOpen('SystemMessage',{server}), 100)} className='px-2.5 py-1.5 text-sm cursor-pointer'>System Message<MessageCircle className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    // isMod&&<DropdownMenuItem onClick={()=>onOpen('CreateChannel',{server})} className='px-2.5 py-1.5 text-sm cursor-pointer'>Create Channel<PlusCircle className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isMod&&<DropdownMenuSeparator />
                }
                {
                    // isAdmin&&<DropdownMenuItem onClick={()=>onOpen('DeleteServer',{server})} className='text-destructive px-2.5 py-1.5 text-sm cursor-pointer'>Delete Server<Trash className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    // !isAdmin&&<DropdownMenuItem onClick={()=>onOpen('LeaveServer',{server})} className='text-destructive px-2.5 py-1.5 text-sm cursor-pointer'>Leave Server<LogOut className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    <DropdownMenuItem onClick={()=>router.post(route('logout'))} className='text-destructive px-2.5 py-1.5 text-sm cursor-pointer'>Logout<LogOut className='h-4 w-4 ml-auto' /></DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader
