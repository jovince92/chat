import Editor from '@/Components/Editor'
import InitialMessageInput from '@/Components/RepliesComponents/InitialMessageInput'
import MenuItem from '@/Components/RepliesComponents/MenuItem'
import RepliesHeader from '@/Components/RepliesComponents/RepliesHeader'
import SubMenus from '@/Components/RepliesComponents/SubMenus'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { toast } from '@/Components/ui/use-toast'
import { cn } from '@/lib/utils'
import { PageProps, SystemMenu, SystemMessage } from '@/types'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { ChevronDown, ChevronRight, Loader2, MoveLeft, PlusCircleIcon, Trash2 } from 'lucide-react'
import React, { FC, FormEventHandler, Fragment, useCallback, useEffect, useState } from 'react'

interface Props{
    sub_menus:SystemMenu[];
}

const Replies:FC<Props> = ({sub_menus}) => {
    
    const {system_message} = usePage<PageProps>().props;
    const initial:SystemMessage|undefined = system_message[0];
    const [adding,setAdding] = useState(false);
    const [expanded,setExpanded] = useState<Record<number,boolean>>({});
    const onExpand = (id:number) =>{
        setExpanded(val=>({...val,[id]:!val[id]}))
    }
    const onAdd = useCallback(() =>{
        router.post(route('system_replies.menus.store'),{
            sys_message_id:initial.id,
        },{        
            onStart:()=>setAdding(true),
            onFinish:()=>setAdding(false),    
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            },
        });
    },[initial.id]);

    return (
        <>
            <Head title='System Messages' />
            <div className='w-full h-full bg-background pt-12 relative overflow-y-auto  md:overflow-y-hidden pb-12 '>
                <RepliesHeader />
                <div className='p-3.5 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:justify-between h-full '>
                    <div className='w-full md:w-1/2 h-full flex flex-col gap-y-1 '>
                        <div className='h-auto p-2.5 rounded '>
                            <InitialMessageInput initial={initial} />
                        </div>
                        <div className='flex-1 p-2.5 overflow-y-auto bg-secondary rounded-lg'>
                            <div className='w-full flex flex-col space-y-2 rounded-lg  '>
                                <div className='flex items-center justify-between bg-background rounded-lg p-3'>
                                    <p>Menus For {initial.message}</p>
                                    <button onClick={onAdd} className=' hover:opacity-70 transition duration-300'>
                                        {
                                            adding ? <Loader2 className='h-5 w-5 animate-spin ' />:<PlusCircleIcon className='h-5 w-5 ' />
                                        }
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-10  rounded-lg'>
                                    {
                                        initial.menus.map(menu=> <MenuItem  key={menu.id} menu={menu} expanded={expanded} isExpanded={expanded[menu.id]} onExpand={id=>onExpand(id)} />)
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='h-full w-[0.065rem] bg-primary hidden md:block' />
                    <div className='w-full md:w-1/2 h-full flex flex-col gap-y-1'>
                        <SubMenus sub_menus={sub_menus} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Replies;




