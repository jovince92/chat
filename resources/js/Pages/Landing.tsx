import ChatSheet from '@/Components/LandingPage/ChatSheet';
import { Button } from '@/Components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Channel, User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { FC, FormEventHandler, ReactNode, useEffect } from 'react';

interface Props{
    channel:Channel;
    user:User;
}

const Landing:FC<Props> = ({channel}) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title='Welcome to Chat Support' />
            <div className="flex flex-col h-screen">

            <header className="bg-secondary/50 text-primary py-4 text-center md:text-left shadow-md">
                <div className="container flex items-center mx-auto ">
                    <h1 className="text-xl font-extrabold w-full">
                        International College
                    </h1>
                    <button className="hidden md:block bg-primary rounded text-secondary text-sm ml-auto w-28 p-2">
                        Contact Us
                    </button>
                </div>
            </header>

            <section className="py-10 bg-gray-300 flex-1">
                <div className='container flex flex-col-reverse md:flex-row items-center'>
                    <div className='w-full p-5 bg-gray-100/50 rounded-md shadow-md
                                    md:w-1/3'>
                        <h1 className='font-bold'>For inquiry or support</h1>
                        <p className='text-sm mt-1 mb-5'>Send us a message by providing contact details</p>
                        <form onSubmit={submit}>
                            <div>
                                <Label htmlFor="name" >Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.email&& <p className='text-xs text-destructive'>{errors.name}</p> }
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="email" >Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                {errors.email&& <p className='text-xs text-destructive'>{errors.name}</p> }
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
            <ChatSheet isOpen={!!channel} onClose={()=>{}} channel={channel} />

            <EntryDialog>
                <Button >
                    Contact Us
                </Button>
            </EntryDialog>
        </>
    )
}

export default Landing;

const EntryDialog:FC<{children:ReactNode}> = ({children}) =>{

    const {data,setData,post,processing} = useForm({name:""})
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('support.enter'),{
            preserveState:false
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
                        Please Enter Your Name Below:
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='form' className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="name" >Your Name:</Label>
                        <Input required autoFocus autoComplete='off' disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} id="name" />
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

