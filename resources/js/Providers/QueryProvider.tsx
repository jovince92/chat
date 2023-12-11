import {FC, ReactNode, useEffect, useState} from 'react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { router } from '@inertiajs/react';


const QueryProvider:FC<{children:ReactNode}> = ({children}) => {
    const [queryClient] = useState(()=>new QueryClient);

    
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default QueryProvider