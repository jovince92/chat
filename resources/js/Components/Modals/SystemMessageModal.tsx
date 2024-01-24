import {  FC,  useCallback,  useEffect,  useMemo, useState, FormEventHandler } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';

import { MemberRole, PageProps, Server, User, SystemMessage, SystemMenu } from '@/types';
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

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../ui/accordion"
import Editor from '../Editor';

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

    const [isRemove, setIsRemove] = useState<boolean>(false);
    const [sysMessageState, setSysMessageState] = useState<SystemMessage[]>(system_message);

    const { data, setData, post, get, processing, errors, reset } = useForm<SystemMessage>();

    useEffect(()=>{
        if (isOpen === true && sysMessageState.length > 0){
            axios
            .get(route('sys_message.index'))
            .then(function(response){
                // console.log(response.data);
                setSysMessageState(response.data);
            })
        }else{
            reset()
        }
    },[isOpen])

    useEffect(()=>{
        if (isOpen === true && sysMessageState.length > 0){
            let initial = sysMessageState[0]
            reset()
            setData(initial);
        }else{
            reset()
        }
    }, [sysMessageState])

    const addMenu = (msg_id:number) => {
        router.post(route('sys_message.add_menu'), {sys_message_id:msg_id},{
            onSuccess:()=>{
                console.log('system message stored')
            }
        });
    };

    const removeMenu = () => {

        setIsRemove(true);

        setData((prevData) => {
            const updatedMenus = [...prevData.menus];
            if (updatedMenus.length===1) {return { ...prevData, menus: updatedMenus }; }
            updatedMenus.splice(updatedMenus.length-1, 1);
            return { ...prevData, menus: updatedMenus };
        });

        // if (data.menus.length===1) { return; }
        // const updatedMenus = data.menus.splice(data.menus.length-1, 1);
        // setData({...data, menus: updatedMenus});

        // console.log(data);
    };

    const updateFields = (index:number, fieldName:string, value:string) => {
        //const updatedMenus = updateMenu(data.menus, index, value);
        // updatedMenus[index].name = value;

        // console.log([index, fieldName, value].join(" - "));

        setData((prevData) => {

            console.log(prevData.menus);

            return {...prevData, menus:prevData.menus}
        });
    };

    interface MenuComponentsProps {
        menu: SystemMenu;
        index: number;
        updateFieldsCallback: (index: number, field: string, value: string) => void;
    }

    const MenuComponents:FC<MenuComponentsProps> = ({menu, index, updateFieldsCallback}) => {

        const [currentMenu, setCurrentMenu] = useState<SystemMenu>(menu);

        const updateMenuAPI = (index: number, name:string, val:string) => {
            setCurrentMenu((prev) => {
                if (name == "name") {
                    prev.name = val;
                }else{
                    prev.replies.message = val;
                }
                return {...prev}
            });
        }

        return (
            <Accordion type="single" className='px-4 rounded bg-neutral-800' collapsible>
                <AccordionItem value="item-1" className='mb-1'>
                    <AccordionTrigger>{(currentMenu.name ? currentMenu.name : 'button ' + currentMenu.id)}</AccordionTrigger>
                    <AccordionContent>
                        <div className='grid gap-3 p-5 mb-5 bg-white dark:bg-neutral-950 rounded-md shadow'>
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
                                    onChange={(e) => updateMenuAPI(index, 'name', e.target.value)}
                                    value={currentMenu.name}
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor={'reply' + index}>
                                    Reply for menu button {index+1}
                                </Label>
                                <Editor
                                    id={'reply' + index}
                                    placeholder="Sure! Please wait..."
                                    onChange={val => updateMenuAPI(index, 'reply', val)}
                                    value={currentMenu.replies.message}
                                />
                            </div>

                            <SystemMessageComponent data={currentMenu.replies} />

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    }

    const SystemMessageComponent:FC<{data:SystemMessage}> = ({data}) => {

        const [ sysMessage, setSysMessage ] = useState<SystemMessage>(data);

        if (!sysMessage.menus) { return; }

        return (
            (sysMessage.menus.length > 0) ?
            <div className='max-h-[20rem] bg-gray-100 dark:bg-neutral-900 p-4 rounded overflow-auto'>
                <div className='flex items-center mb-4'>
                    <p className='font-bold text-xs'>MENUS</p>
                    <div className='flex items-center ml-auto'>
                        <button type="button" onClick={()=>addMenu(sysMessage.id)} className='text-green-600 mr-0.5'>
                            <PlusSquare/>
                        </button>
                        <button type="button" onClick={removeMenu} className='text-red-600'>
                            <XSquare/>
                        </button>
                    </div>
                </div>
                {
                    sysMessage.menus.map((menu,index) =>
                        menu && <MenuComponents key={index} menu={menu} index={index} updateFieldsCallback={updateFields} />
                    )
                }
            </div>
            :
            <></>
        )
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isRemove) {
            setIsRemove(false);
            return;
        }

        console.log(data);

        post(route('sys_message.store'),{
            onSuccess:()=>console.log('system message stored')
        });
    };

    if(!OPEN) return null;

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className='overflow-auto lg:max-w-4xl'>
                <DialogHeader className='px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>System Message</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                    </DialogDescription>
                </DialogHeader>

                <Accordion type="single" collapsible className='max-h-[35rem]'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Initial message when user sends a message</AccordionTrigger>
                        <AccordionContent>
                            <form onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-1.5">
                                        <textarea className='rounded resize-none dark:bg-neutral-950'
                                            required
                                            id="initial_message"
                                            placeholder="Hello! Welcome to Chat Support. What can we do for you?"
                                            autoCapitalize="none"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            disabled={processing}
                                            onChange={({target}) => setData("message", target.value)}
                                            value={data.message}
                                        />
                                    </div>

                                    <SystemMessageComponent data={data} />

                                    <Button disabled={processing}>
                                        {processing && (<Loader className="mr-2 h-4 w-4 animate-spin" />)}
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Sub Menus</AccordionTrigger>
                        <AccordionContent>
                            <SubMenus messageState={sysMessageState} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DialogContent>
        </Dialog>
    )
}

export default SystemMessageModal

// ************************************************

interface SubMenusProps {
    messageState: SystemMessage[];
}

const SubMenus:FC<SubMenusProps> = ({messageState}) => {

    const [isRemove, setIsRemove] = useState<boolean>(false);

    const { data, setData, post, get, processing, errors, reset } = useForm({
        menus: [{ id:0, reply_id:0, name:'', reply:'' }],
    });

    useEffect(()=>{
        if (isRemove === false && messageState.length > 0) {
            axios
            .get(route('sys_message.sub_index'))
            .then(function(response){

                if (response.data) {
                    const d = response.data;

                    if (d.length > 0) {
                        console.log("hello world");

                        setData((prevData) => ({
                            ...prevData,
                            menus: d.map((m:any) => ({
                                id: m.sys_message_id,
                                reply_id: m.sys_message_reply_id,
                                name: m.name,
                                reply: m.replies.message,
                            })),
                        }))
                    }
                }
            })
        }
    }, [messageState])

    const addMenu = () => {
        setData((prevData) => ({
            ...prevData,
            menus: [...prevData.menus,
                { id:prevData.menus.length, reply_id:prevData.menus.length+1, name: '', reply: '' }],
        }));
    };

    const removeMenu = () => {
        setIsRemove(true);

        if (data.menus.length===1) { return; }

        // Create a new array without the item at the specified index
        const updatedMenus = data.menus.filter((_, index) => index !== data.menus.length-1);

        // Update the state with the new array
        setData({ ...data, menus: updatedMenus });

        console.log(updatedMenus);
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isRemove) {
            setIsRemove(false);
            return;
        }

        post(route('sys_message.sub_store'),{
            onSuccess:()=>console.log('system message stored')
        });
    };

    const renderFields = () => {
        return data.menus.map((menu,index) => (
            <div key={index} className='grid gap-3 p-5 mb-5 bg-white dark:bg-neutral-950 rounded-md shadow pb-16'>
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
                        onChange={(e) => updateFields(index, 'name', e.target.value)}
                        value={menu.name}
                    />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor={'reply' + index}>
                        Reply for menu button {index+1}
                    </Label>
                    <Editor
                        id={'reply' + index}
                        placeholder="Sure! Please wait..."
                        onChange={val => updateFields(index, 'reply', val)}
                        value={menu.reply}
                    />
                </div>
            </div>
        ))
    }

    return (
        <form onSubmit={submit}>
            <div className="grid gap-6">
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
    )
}
