import React, { FC, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Channel, User } from '@/types';

interface Props{
    isOpen?:boolean;
    channel?:Channel;
    onClose:()=>void;
    user?:User;
}

const ChatSheet:FC<Props> = ({isOpen,channel,onClose,user}) => {
    

    if(!channel || !user) return null;
    return (
        <Sheet open={isOpen}>
            <SheetContent className='h-full flex flex-col'>
                <SheetHeader className='h-auto'>
                    <SheetTitle>Welcome to Chat Support</SheetTitle>
                    <SheetDescription>
                        You Are Now Connected to Chat Support. Please be patient while we assign an agent
                    </SheetDescription>
                </SheetHeader>
                <div className='flex-1 flex flex-col '>
                    
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ChatSheet