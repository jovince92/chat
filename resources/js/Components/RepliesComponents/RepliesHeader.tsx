import { FC } from "react";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import { router } from "@inertiajs/react";

const RepliesHeader:FC = () =>{
    return(
        <>
            <div className='h-12 border-b-2 border-b-muted-foreground p-1.5 absolute top-0 w-full'>
                    <Button onClick={()=>router.get(route('home'))} variant='ghost' size='sm' className='flex items-center gap-x-2 px-5'>
                        <MoveLeft className='h-5 w-5' />
                        <span>
                            Go Back
                        </span>
                    </Button>
                </div>
            <div className='w-full text-center py-2 font-bold tracking-tight text-2xl'>
                System Messages
            </div>
        </>
    );
}

export default RepliesHeader;