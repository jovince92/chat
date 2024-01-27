import { FC, FormEventHandler } from "react";
import { toast } from "../ui/use-toast";
import { SystemMessage } from "@/types";
import { useForm } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";


const InitialMessageInput:FC<{initial:SystemMessage}> = ({initial}) =>{

    const {data,setData,processing,errors,post} = useForm({
        message:initial.message,
        id:initial.id
    });

    const onSave:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('system_replies.update'),{
            preserveScroll:true,
            onSuccess:()=>{},
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            }
        });
    }

    

    return(
        <>
            <p className='font-semibold h-auto'>Initial message when user sends a message</p>
            <form onSubmit={onSave} className='block relative w-full h-auto'>
                <Input value={data.message} onChange={({target})=>setData('message',target.value)} disabled={processing} required className='w-full pr-20' />
                <Button disabled={processing} className='w-16 absolute inset-y-0 right-0 flex items-center justify-center'>
                    {processing ? <Loader2 className='h-5 w-5 animate-spin' />:<span>Save</span>}
                    
                </Button>
            </form>
        </>
    );
}

export default InitialMessageInput;