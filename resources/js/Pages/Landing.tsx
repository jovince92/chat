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

const Landing:FC<Props> = ({channel,user}) => {
    console.log([channel,user]);
    return (
        <>
            <Head title='Welcome to Chat Support' />
            <div className="bg-background h-full">
            {/* Header Section */}
                <header className="bg-secondary text-primary py-10">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-extrabold mb-4">
                            Elevate Your Customer Support with Chat
                        </h1>
                        <p className="text-lg">
                            Connect with your customers in real-time and provide excellent
                            support with our chat solutions.
                        </p>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-16">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Real-time Chat</CardTitle>
                                    <CardDescription>Engage with your customers instantly through real-time chat,fostering better communication and satisfaction.</CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Feature 2 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>24/7 Support</CardTitle>
                                    <CardDescription>Provide round-the-clock support, ensuring your customers get assistance whenever they need it.</CardDescription>
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Customizable Solutions</CardTitle>
                                    <CardDescription>Tailor our chat solutions to meet the unique needs of your business and customers.</CardDescription>
                                </CardHeader>
                            </Card>

                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="bg-muted text-primary py-16">
                    <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Enhance Your Customer Support?
                    </h2>
                    <p className="text-lg mb-8">
                        Contact us today to get started with our chat support solutions.
                    </p>
                    
                    <EntryDialog>
                        <Button >
                            Contact Us
                        </Button>
                    </EntryDialog>
                    
                    </div>
                </section>
            </div>
            <ChatSheet isOpen={!!channel} onClose={()=>{}} channel={channel} user={user} />
        </>
    )
}

export default Landing;

const EntryDialog:FC<{children:ReactNode}> = ({children}) =>{

    const {data,setData,post,processing} = useForm({name:"",email:""})
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
                        Please Enter Your Contact Details Below:
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} id='form' className="flex flex-col space-y-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="name" >Your Name:</Label>
                        <Input required autoFocus autoComplete='off' disabled={processing} value={data.name} onChange={({target})=>setData('name',target.value)} id="name" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="email" >Your Email:</Label>
                        <Input required type='email' autoComplete='off' disabled={processing} value={data.email} onChange={({target})=>setData('email',target.value)} id="email" />
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

