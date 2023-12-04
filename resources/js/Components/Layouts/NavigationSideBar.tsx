import { PageProps } from '@/types';
import { usePage,router } from '@inertiajs/react';
import {FC, useEffect} from 'react'
import NavigationAction from './NavigationAction';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import NavigationItem from './NavigationItem';
import ModeToggle from '../ModeToggle';
import UserAvatar from '../UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronsLeftRight, ChevronDown } from 'lucide-react';

const NavigationSideBar:FC = () => {
    const {auth,servers,current_server} = usePage<PageProps>().props;
    const {user}=auth;


    return (
        <div className='flex flex-col space-y-3.5 items-center h-full text-primary w-full bg-neutral-200 dark:bg-neutral-900  py-2.5'>
            {/* <NavigationAction /> */}
            {/* <Separator className='h-[0.12rem] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' /> */}
            <ScrollArea className='flex-1 w-full'>
                {
                    servers.map(server=>(
                        <div key={server.id} className='mb-3.5'>
                            <NavigationItem server={server} />
                        </div>
                    ))
                }
            </ScrollArea>
            <ModeToggle />
            {/* <UserAvatar user={user} /> */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div role='button' className='flex items-center justify-center text-sm p-2.5 mb-4'>
                    <UserAvatar user={user} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            {/* <p className="text-xs leading-none text-primary">{user.email}</p> */}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>router.post(route('logout'))}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default NavigationSideBar
