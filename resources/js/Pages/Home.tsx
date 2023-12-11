
import Layout from '@/Components/Layouts/Layout';
import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import ConversationProvider from '@/Providers/ConversationProvider';
import { useEffect } from 'react';
import { Message, PageProps, PaginatedMessage } from '@/types';
import { useQueryClient } from '@tanstack/react-query';


const Home = () => {
    
    
    return (
        <>
            <Head title='Chat' />
                <ConversationProvider>
                    <Layout>
                        <ServerIdLayout>
                            <ChannelLayout />
                        </ServerIdLayout>
                    </Layout>
                </ConversationProvider>
        </>
    )
}

export default Home