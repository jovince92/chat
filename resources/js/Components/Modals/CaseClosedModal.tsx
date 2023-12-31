import {  FC,  useCallback,  useEffect,  useMemo, useState, FormEventHandler } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';

import { MemberRole, PageProps, Server, User } from '@/types';
import { router, useForm, usePage, } from '@inertiajs/react';
import axios from 'axios';
import { toast, useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../UserAvatar';
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion,Loader,AlertCircle, PlusCircle, Delete, XCircle, Plus, X, PlusSquare, XSquare } from 'lucide-react';
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuPortal,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button'

const roleIconMap ={
    'GUEST':null,
    'MODERATOR':<ShieldCheck className='h-4 w-4 ml-1.5 text-indigo-500' />,
    'ADMIN':<ShieldAlert className='h-4 w-4 ml-1.5 text-rose-500' />,
}

const CaseClosedModal:FC = () => {
    const {isOpen,onClose,type,data:ModaData} = useModal();
    const {current_server,user} = usePage<PageProps>().props;
    const {users}=current_server;

    const { toast } = useToast();


    // useEffect(()=>{
    //     console.log(ModaData.channel?.user)
    // },[isOpen]);

    const OPEN = useMemo(()=>isOpen&&type==='CaseClosed',[isOpen,type]);

    const { data, setData, post, processing, errors, reset } = useForm({
        initial_message: '',
        menus: [{ name:'', reply:'' }],
    });

    const onCaseClose = () =>{
        if(!ModaData.channel) return;
        router.get(route('support.close'),{
            channel_id:ModaData.channel.id
        },{
            onSuccess:()=>{
                toast({description:'Case Closed'});
                onClose();
            },
        })
    }

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className=' overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Close this {users[0].name}'s case?</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                        after closing this case, user unable to reply anymore and
                        system will automatically send a score / rating choices for user to choose based on agent's assistance
                    </DialogDescription>
                </DialogHeader>
                    <Button onClick={onCaseClose}>Yes, close this case</Button>
                </DialogContent>
        </Dialog>
    )
}

export default CaseClosedModal

