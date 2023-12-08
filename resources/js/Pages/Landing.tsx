import ChatSheet from '@/Components/LandingPage/ChatSheet';
import { Button } from '@/Components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Channel, User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

import { Loader2,School,Loader,AlertCircle } from 'lucide-react';
import { FC, FormEventHandler, ReactNode, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

interface Props{
    channel:Channel;
    user:User;
}

const Landing:FC<Props> = ({channel,user}) => {

    const { data, setData, post, get, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('support.enter'),{
            preserveState:false,
            onError:(e)=>{
                console.error(e);
            }
        })
    };

    const [openLogin,setOpenLogin] = useState<boolean>(false);

    console.log([channel,user]);

    return (
        <>
            <Head title='Welcome to Chat Support' />
            <div className="flex flex-col h-screen">

            <header className="bg-white dark:bg-gray-800 text-primary py-4 text-center md:text-left shadow-md">
                <div className="container flex items-center mx-auto ">
                    <h1 className="text-xl font-extrabold w-full flex items-center">
                        <School className='mr-4'/>
                        <span>Lorem Ipsum</span>
                    </h1>
                    <button onClick={()=>setOpenLogin(true)}
                        className="hidden md:block bg-primary rounded text-secondary text-sm ml-auto w-28 p-2">
                        Login
                    </button>
                </div>
            </header>

            <section className="py-10 bg-gray-300 dark:bg-gray-700 flex-1">
                <div className='container flex flex-col-reverse md:flex-row items-center'>
                    <div className='w-full p-5 bg-gray-100/50 dark:bg-gray-600 rounded-md shadow-md
                                    md:w-1/3'>
                        <h1 className='font-bold'>For inquiry or support</h1>
                        <p className='text-sm mt-1 mb-5'>Send us a message by providing contact details</p>

                        <form onSubmit={submit}>

                        <div className="grid flex-1 gap-2 mb-4">
                            <Label htmlFor="name" >Name:</Label>
                            <Input required autoFocus autoComplete='off' disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} id="name"
                                className='dark:bg-gray-700' />
                            {errors.email&& <span>{errors.name}</span>}
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="email" >Email:</Label>
                            <Input required type='email' autoComplete='off' disabled={processing} value={data.email} onChange={({target})=>setData('email',target.value)} id="email"
                                className='dark:bg-gray-700' />
                            {errors.email&& <span>{errors.email}</span>}
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <Button className="ml-4" disabled={processing}>
                                Send Message
                            </Button>
                        </div>

                        </form>
                    </div>

                    <div className='mb-5 md:mb-0 md:ml-auto'>
                        <img src={`${route('landing')}/images/school.svg`} className='w-full h-[15rem] md:h-[30rem]'/>
                    </div>
                </div>
            </section>
            </div>

            <ChatSheet isOpen={!!channel} onClose={()=>{}} channel={channel} user={user} />
            <LoginDialog openLogin={openLogin} onClose={()=>setOpenLogin(false)} />
        </>
    )
}

export default Landing;

const EntryDialog:FC<{children:ReactNode}> = ({children}) =>{

    const {data,setData,post,processing,errors} = useForm({name:"",email:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('support.enter'),{
            preserveState:false,
            onError:(e)=>{
                console.error(e);
            }
        })
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Welcome to Chat Support</DialogTitle>
                    <DialogDescription>
                        Please Enter Your Contact Details Below:
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='form' className="flex flex-col space-y-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="name" >Your Name:</Label>
                        <Input required autoFocus autoComplete='off' disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} id="name" />
                        {errors.email&& <span>{errors.name}</span>}
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="email" >Your Email:</Label>
                        <Input required type='email' autoComplete='off' disabled={processing} value={data.email} onChange={({target})=>setData('email',target.value)} id="email" />
                        {errors.email&& <span>{errors.email}</span>}
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button  disabled={processing} type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    <Button  disabled={processing} type='submit' form='form'>
                        {processing&& <Loader2 className='h-5 w-5 mr-2 animate-spin' /> }
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const LoginDialog:FC<{openLogin:boolean|undefined, onClose:()=>void}> = ({openLogin,onClose}) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'),{
            onSuccess:()=>router.get(route('home'))
        });
    };

    return (
        <Dialog open={openLogin} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>

                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password
                        </p>
                    </div>
                    <div className='grid gap-6'>
                        <form onSubmit={submit}>
                            {
                                (errors.email||errors.password)&&(
                                    <Alert variant="destructive" className='mb-6'>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>

                                        <AlertDescription className='flex flex-col space-y-1.5'>
                                            <span>
                                                {errors?.email}
                                            </span>
                                            <span>
                                                {errors?.password}
                                            </span>
                                        </AlertDescription>
                                    </Alert>
                                )
                            }
                            <div className="grid gap-6">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        id="email"
                                        placeholder="name@example.com"
                                        type="text"
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
                                <Button disabled={processing}>
                                    {processing && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign In
                                </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
