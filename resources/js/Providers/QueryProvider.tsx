import {FC, ReactNode, useEffect, useState} from 'react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { router } from '@inertiajs/react';


const QueryProvider:FC<{children:ReactNode}> = ({children}) => {
    const [queryClient] = useState(()=>new QueryClient);
   
    useEffect(()=>{
        const e=window.Echo.join('global_channel')
                .listen('NewCustomerEvent',(e:any)=>router.reload(),
                
        );
        console.log('subbed',e)
    },[]);
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default QueryProvider