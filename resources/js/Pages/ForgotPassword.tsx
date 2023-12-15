import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { toast } from '@/Components/ui/use-toast';
import { Head, router, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React, { FormEventHandler } from 'react'

const ForgotPassword = () => {
    const {data,setData,processing,errors,post} =useForm({email:""});

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('send_email'),{
            onSuccess:()=>toast({title:'Email Sent','description':'Please Go Back To Main Page then Login'}),
            onError:()=>toast({title:'System Error',description:"Something Went Wrong. Please Try Again",variant:'destructive'})
        });
    }

    return (
        <>
            <Head title='Reset Password' />
            <div className='w-full h-full pt-6 md:pt-28'>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>Enter your valid email address below. We will send you your new password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id='form' onSubmit={onSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email:</Label>
                                    <Input value={data.email} onChange={({target})=>setData('email',target.value)} disabled={processing} id="email" type='email' placeholder="random_email@gmail.com" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button disabled={processing} onClick={()=>router.get(route('landing'))} variant="outline">Go Back</Button>
                        <Button type='submit' form='form' disabled={processing}>
                            {processing && <Loader2 className='h-5 w-5 mr-2 animate-spin' />}
                            Send Email
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ForgotPassword