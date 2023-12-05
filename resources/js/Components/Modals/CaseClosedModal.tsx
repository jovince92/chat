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
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const {users}=current_server;

    const { toast } = useToast();

    console.log(type);

    const OPEN = useMemo(()=>isOpen&&type==='CaseClosed',[isOpen,type]);

    const { data, setData, post, processing, errors, reset } = useForm({
        initial_message: '',
        menus: [{ name:'', reply:'' }],
    });

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className=' overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Case Closed</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                    </DialogDescription>
                </DialogHeader>
                </DialogContent>
        </Dialog>
    )
}

export default CaseClosedModal

