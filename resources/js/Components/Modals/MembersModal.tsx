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

const MembersModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const {users}=current_server;

    const { toast } = useToast();


    const OPEN = useMemo(()=>isOpen&&type==='Members',[isOpen,type]);
    const [openRegister,setOpenRegister] = useState(false);

    if(!OPEN) return   null;

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className=' overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Manage Members</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                        {
                            `${current_server.users.length.toString()} Member${current_server.users.length>1?'s':''}`
                        }
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className='mt-7 max-h-[26.25rem] pr-5'>
                    {
                        users.map(user=>(
                            <MemberModalItem current_server={current_server} key={user.id} user={user} />
                        ))
                    }
                </ScrollArea>

                <div className='w-full text-center mb-2'>
                    <Button onClick={()=>setOpenRegister(true)} className='mx-auto'>Add New User</Button>
                </div>
                <RegisterDialog openRegister={openRegister} onClose={()=>setOpenRegister(false)}/>

                </DialogContent>
        </Dialog>
    )
}

export default MembersModal

interface MemberModalItemProps{
    user:User;
    current_server:Server;
}

const MemberModalItem:FC<MemberModalItemProps> = ({user,current_server}) =>{

    const [processing,setProcessing] = useState(false);

    const onRoleChange=(role:MemberRole) =>{
        setProcessing(true);
        router.visit(route('member.role_change'),{
            method:'post',
            data:{
                server_id:current_server.id,
                user_id:user.id,
                role
            },
            preserveState:true,
            onFinish:()=>{
                setProcessing(false);
                toast({
                    'title':'Success',
                    'description':'Role Changed!'
                })
            }
        });
    }

    const onKick = () =>{
        setProcessing(true);
        router.visit(route('member.kick'),{
            method:'post',
            data:{
                server_id:current_server.id,
                user_id:user.id
            },
            preserveState:true,
            onFinish:()=>{
                setProcessing(false);
                toast({
                    'title':'Success',
                    'description':`${user.name} has been Kicked!`
                })
            }
        });
    }


    return(
        <>
            <div  className='flex items-center gap-x-1.5 mb-4'>
                <UserAvatar user={user} />
                <div className='flex flex-col gap-y-1'>
                    <p className='text-xs font-semibold flex items-center gap-x-1'>
                        {user.name}
                        {roleIconMap[user.pivot.member_role]}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        {user.email}
                    </p>
                </div>
                {
                    ((current_server.user_id!==user.id)&&!processing) &&(
                        <div className='ml-auto'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className='h-4 w-4 text-muted-foreground' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='left'>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className='flex items-center'>
                                            <ShieldQuestion className='w-4 h-4 mr-1.5'/>
                                            <span>Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                {/* <DropdownMenuItem onClick={()=>onRoleChange('GUEST')}>
                                                    <Shield className='h-4 w-4 mr-1.5' />
                                                    GUEST
                                                    {
                                                        user.pivot.member_role==='GUEST'&&<Check className='h-4 w-4 ml-auto' />
                                                    }
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem onClick={()=>onRoleChange('MODERATOR')}>
                                                    <ShieldCheck className='h-4 w-4 mr-1.5' />
                                                    MODERATOR
                                                    {
                                                        user.pivot.member_role==='MODERATOR'&&<Check className='h-4 w-4 ml-auto' />
                                                    }
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onKick}>
                                        <Gavel className='h-4 w-4 mr-1.5' />
                                        Kick
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    )
                }
                {
                    processing && <Loader2 className='animate-spin text-secondary-foreground ml-auto w-4 h-4' />
                }
            </div>
        </>
    )
}


const RegisterDialog:FC<{openRegister:boolean|undefined, onClose:()=>void}> = ({openRegister,onClose}) => {

    const [openState,setOpenState] = useState<boolean|undefined>(false);

    const OPEN = useMemo(()=>setOpenState(openRegister),[openRegister]);


    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('member.register'),{
            preserveState:true,
            onFinish:()=>{
                setOpenState(false);
                toast({
                    'title':'Success',
                    'description':`${data.name} account has been created`
                })
            }
        });
    };

    return (
        <Dialog open={openState} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>

                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            New Account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter the details of new user account
                        </p>
                    </div>
                    <div className='grid gap-6'>
                        <form onSubmit={submit}>
                            {
                                (errors.email||errors.password||errors.name||errors.password_confirmation)&&(
                                    <Alert variant="destructive" className='mb-6'>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>

                                        <AlertDescription className='flex flex-col space-y-1.5'>
                                            <span>
                                                {errors?.email}
                                            </span>
                                            <span>
                                                {errors?.password}
                                            </span><span>
                                                {errors?.name}
                                            </span>
                                        </AlertDescription>
                                    </Alert>
                                )
                            }

                            <div className="grid gap-6">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        required
                                        id="name"
                                        placeholder="Juan Dela Cruz"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('name', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('email', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        required
                                        id="password"
                                        placeholder="password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('password', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password_confirmation">
                                        Password Confirmation
                                    </Label>
                                    <Input
                                        required
                                        id="password_confirmation"
                                        placeholder="password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('password_confirmation', target.value)}
                                    />
                                </div>
                                <Button disabled={processing}>
                                    {processing && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

