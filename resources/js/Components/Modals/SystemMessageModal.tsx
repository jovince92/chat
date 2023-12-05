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
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion,Loader,AlertCircle } from 'lucide-react';
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuPortal,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button'

const roleIconMap ={
    'GUEST':null,
    'MODERATOR':<ShieldCheck className='h-4 w-4 ml-1.5 text-indigo-500' />,
    'ADMIN':<ShieldAlert className='h-4 w-4 ml-1.5 text-rose-500' />,
}

const SystemMessageModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const {users}=current_server;

    const { toast } = useToast();

    console.log(type);

    const OPEN = useMemo(()=>isOpen&&type==='SystemMessage',[isOpen,type]);

    const { data, setData, post, processing, errors, reset } = useForm({
        initial_message: '',
        menu1: '',
        reply1: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('sys_message.store'),{
            onSuccess:()=>console.log('system message stored')
        });
    };

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className=' overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>System Message</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                    </DialogDescription>
                </DialogHeader>
                {/* <ScrollArea className='mt-7 max-h-[26.25rem] p-5'></ScrollArea> */}

                <form onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-1.5">
                            <Label htmlFor="initial_message" className='mb-2'>
                                Initial message when user sends a message
                            </Label>

                            <textarea className='rounded resize-none text-primary   bg-background'
                                required
                                id="initial_message"
                                placeholder="Hello! Welcome to Chat Support. What can we do for you?"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                disabled={processing}
                                onChange={({target}) => setData('initial_message', target.value)}
                            />
                        </div>

                        <div className='grid gap-6 px-5'>
                            <div className="grid gap-1.5">
                                <Label htmlFor="menu1">
                                    Menu button 1
                                </Label>
                                <Input
                                    required
                                    id="menu1"
                                    placeholder="Can I speak to one of your agents?"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    disabled={processing}
                                    onChange={({target}) => setData('menu1', target.value)}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="reply1">
                                    Reply for menu button 1
                                </Label>
                                <Input
                                    required
                                    id="reply1"
                                    placeholder="Sure! Please wait..."
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    disabled={processing}
                                    onChange={({target}) => setData('reply1', target.value)}
                                />
                            </div>
                        </div>


                        <Button disabled={processing}>
                            {processing && (<Loader className="mr-2 h-4 w-4 animate-spin" />)}
                            Save
                        </Button>
                    </div>
                </form>
                </DialogContent>
        </Dialog>
    )
}

export default SystemMessageModal

