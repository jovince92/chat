import {  FC,  useCallback,  useEffect,  useMemo, useState, FormEventHandler } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';

import { MemberRole, PageProps, Server, User, SystemMessage } from '@/types';
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

const SystemMessageModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server,system_message} = usePage<PageProps>().props;
    const {users}=current_server;

    const { toast } = useToast();

    const OPEN = useMemo(()=>isOpen&&type==='SystemMessage',[isOpen,type]);

    const [sysMessageState, setSysMessageState] = useState<SystemMessage[]>(system_message);
    
    const { data, setData, post, get, processing, errors, reset } = useForm({
        initial_message: '',
        menus: [{ id:0, reply_id:0, name:'', reply:'' }],
    });

    useEffect(()=>{
        if (isOpen === true && sysMessageState.length > 0){
            axios
            .get(route('sys_message.index'))
            .then(function(response){
                setSysMessageState(response.data);
            })
        }else{
            reset()
        }
    },[isOpen])

    useEffect(()=>{
        if (isOpen === true && sysMessageState.length > 0){
            var initial = sysMessageState[0]
            reset()

            setData('initial_message', initial.message);

            setData((prevData) => ({
                ...prevData,
                menus: initial.menus.map((m) => ({
                    id: m.id,
                    reply_id: m.replies.id,
                    name: m.name,
                    reply: m.replies.message,
                })),
            }))
        }else{
            reset()
        }
    }, [sysMessageState])

    const addMenu = () => {
        setData((prevData) => ({
            ...prevData,
            menus: [...prevData.menus, 
                { id:prevData.menus.length, reply_id:prevData.menus.length+1, name: '', reply: '' }],
        }));
    };

    const removeMenu = () => {
        setData((prevData) => {
            const updatedMenus = [...prevData.menus];
            if (updatedMenus.length===1) {return { ...prevData, menus: updatedMenus }; }
            updatedMenus.splice(updatedMenus.length-1, 1);
            return { ...prevData, menus: updatedMenus };
        });
    };

    const updateFields = (index:number, fieldName:string, value:string) => {
        setData((prevData) => {
            const updatedMenus = [...prevData.menus];

            updatedMenus[index].id = index+1;
            updatedMenus[index].reply_id = index+2;

            if (fieldName === 'name'){
                updatedMenus[index].name = value;
            }else{
                updatedMenus[index].reply = value;
            }
            return { ...prevData, menus: updatedMenus };
        });
    };

    const renderFields = () => {
        return data.menus.map((menu,index) => (
            <div key={index} className='grid gap-3 p-5 mb-5 bg-white dark:bg-neutral-950 rounded-md shadow'>
                <div className="grid gap-1.5">
                    <Label htmlFor={'name' + index}>
                        Menu button {index+1}
                    </Label>
                    <Input
                        required
                        id={'name' + index}
                        placeholder="Can I speak to one of your agents?"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={processing}
                        // onChange={({target}) => setData(menu, target.value)}
                        onChange={(e) => updateFields(index, 'name', e.target.value)}
                        value={menu.name}
                    />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor={'reply' + index}>
                        Reply for menu button {index+1}
                    </Label>
                    <Input
                        required
                        id={'reply' + index}
                        placeholder="Sure! Please wait..."
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={processing}
                        // onChange={({target}) => setData(menu, target.value)}
                        onChange={(e) => updateFields(index, 'reply', e.target.value)}
                        value={menu.reply}
                    />
                </div>
            </div>
        ))
    }

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

                            <textarea className='rounded resize-none dark:bg-neutral-950'
                                required
                                id="initial_message"
                                placeholder="Hello! Welcome to Chat Support. What can we do for you?"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                disabled={processing}
                                onChange={({target}) => setData('initial_message', target.value)}
                                value={data.initial_message}
                            />
                        </div>

                        <div className='max-h-[20rem] bg-gray-100 dark:bg-neutral-900 p-4 rounded overflow-auto'>
                            <div className='flex items-center mb-4'>
                                <p className='font-bold text-xs'>MENUS</p>
                                <div className='flex items-center ml-auto'>
                                    <button onClick={addMenu} className='text-green-600 mr-0.5'>
                                        <PlusSquare/>
                                    </button>
                                    <button onClick={removeMenu} className='text-red-600'>
                                        <XSquare/>
                                    </button>
                                </div>
                            </div>

                            {renderFields()}
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

