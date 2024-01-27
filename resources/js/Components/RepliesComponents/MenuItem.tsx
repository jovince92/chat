import { SystemMenu } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FC, FormEventHandler, Fragment, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { ChevronDown, ChevronRight, Loader2, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Editor from "../Editor";

interface MenuItemProps{
    menu:SystemMenu;
    expanded:Record<number,boolean>;
    isExpanded?:boolean;
    onExpand:(id:number)=>void;
    isChild?:boolean;
}
const MenuItem:FC<MenuItemProps> = ({menu,expanded,onExpand,isExpanded,isChild}) =>{
    const [adding,setAdding] = useState(false);
    const {data,setData,processing,errors,post} = useForm({
        id:menu.id,
        name:menu.name,
    });

    const {data:replyData,setData:setReplyData,processing:replyProcessing,errors:replyErrors,post:replyPost} = useForm({
        id:menu.replies.id,
        message:menu.replies.message,
    });
    const [deleting,setDeleting] = useState(false);


    const onDelete = () => router.post(route('system_replies.menus.destroy'),{id:menu.id},{
        onStart:()=>setDeleting(true),
        onError:e=>{
            console.error(e);
            toast({description: 'An error occured while saving your message',variant:'destructive'});
        },
        onFinish:()=>setDeleting(false)
    });

    useEffect(()=>setReplyData(val=>({...val,id:menu.replies.id,message:menu.replies.message})),[menu]);
    const hasUpdatedReply = replyData.message!==menu.replies.message;

    const onSave:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('system_replies.menus.update'),{
            preserveScroll:true,
            onSuccess:()=>{},
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            }
        });
    }

    const onReplySave:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        replyPost(route('system_replies.update'),{
            preserveScroll:true,
            onSuccess:()=>{},
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            }
        });
    }

    const onChildAdd = () =>{
        router.post(route('system_replies.menus.store'),{
            sys_message_id:menu.replies.id,
        },{
            onStart:()=>setAdding(true),
            onFinish:()=>setAdding(false),
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            },
        });
    }

    return(
        <div className={cn('p-3.5 border-2 rounded-lg  flex-col space-y-2.5 w-full bg-background flex')}>
            <div  className='w-full flex items-center justify-between ' >
                <div onClick={()=>onExpand( menu.id)} role='banner' className='flex items-center'>
                    { !isExpanded?<ChevronRight className='h-5 w-5 ' />:<ChevronDown className='h-5 w-5 ' /> }
                    <Label className='cursor-pointer'> Menu&nbsp;{data.name}</Label>
                </div>
                <button onClick={onDelete} type='button' className='ml-auto'>
                    {
                        deleting ? <Loader2 className='h-5 w-5  animate-spin' />:<Trash2 className='h-5 w-5 text-destructive' />
                    }
                </button>
            </div>
            {isExpanded&&(
                <Fragment>
                    <form  onSubmit={onSave} className='block relative'>

                        <Input value={data.name} onChange={({target})=>setData('name',target.value)} disabled={processing} required className='w-full pr-20' />
                        <Button disabled={processing} className='w-16 absolute inset-y-0 right-0 flex items-center justify-center'>
                            {processing ? <Loader2 className='h-5 w-5  animate-spin' />:<span>Update</span>}

                        </Button>

                    </form>
                    <form  onSubmit={onReplySave} className='flex flex-col space-y-2 w-full'>
                        <Label>Reply For&nbsp;{data.name} </Label>
                        <Editor
                            placeholder="Sure! Please wait..."
                            onChange={e=>setReplyData('message',e)}
                            value={replyData.message}
                            />
                        <div className='w-full flex items-center justify-end space-x-2'>
                            <Button disabled={replyProcessing} size='sm' variant='secondary' className="truncate">
                                {replyProcessing ? <Loader2 className='h-5 w-5 animate-spin' />:<span>Save Reply Changes</span>}
                            </Button>
                            <Button disabled={adding || replyProcessing || hasUpdatedReply} onClick={onChildAdd} size='sm' type='button'>
                                Add Menu
                            </Button>
                        </div>
                    </form>
                </Fragment>)
            }
            <div className='pl-2 border-l-2 border-neutral-700 dark:border-neutral-400 w-full '>
                {
                    menu.replies.menus.map(child=><MenuItem isChild key={child.id}  menu={child} isExpanded={expanded[child.id]} expanded={expanded} onExpand={onExpand} />)
                }
            </div>
        </div>
    );
}

export default MenuItem;
