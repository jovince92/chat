import { SystemMenu } from '@/types';
import { router } from '@inertiajs/react';
import { Loader2, PlusCircleIcon } from 'lucide-react';
import React, { FC, useState } from 'react'
import MenuItem from './MenuItem';
import { toast } from '../ui/use-toast';

interface Props{
    sub_menus:SystemMenu[];
}

const SubMenus:FC<Props> = ({sub_menus}) => {
    const [adding,setAdding] = useState(false);
    const [expanded,setExpanded] = useState<Record<number,boolean>>({});
    const onExpand = (id:number) =>{
        setExpanded(val=>({...val,[id]:!val[id]}))
    }
    const onAdd = () =>{
        router.post(route('system_replies.store'),{

        },{
            onStart:()=>setAdding(true),
            onFinish:()=>setAdding(false),
            onError:e=>{
                console.error(e);
                toast({description: 'An error occured while saving your message',variant:'destructive'});
            },
        });
    };

    return (
        <div className='h-full overflow-y-auto'>
            <p className='font-semibold h-auto'>Sub Menus</p>
            <div className='flex-1 p-2.5  bg-secondary rounded-lg '>
                <div className='w-full flex flex-col space-y-2 rounded-lg  '>
                    <div className='flex items-center justify-between bg-background rounded-lg p-3'>
                        <button onClick={onAdd} className=' hover:opacity-70 transition duration-300 flex items-center space-x-2'>
                            <span>Add A New Sub Menu</span>
                            {
                                adding ? <Loader2 className='h-5 w-5 animate-spin ' />:<PlusCircleIcon className='h-5 w-5 ' />
                            }
                        </button>
                    </div>
                    <div className='flex flex-col space-y-1  rounded-lg'>
                        {
                            sub_menus.map(menu=> <MenuItem  key={menu.id} menu={menu} expanded={expanded} isExpanded={expanded[menu.id]} onExpand={id=>onExpand(id)} />)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SubMenus
