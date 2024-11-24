'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

import { AppRouter } from '@/server';

export const trpc = createTRPCReact<AppRouter>({});

export function TRPCProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => {
        const wsClient = createWSClient({
            url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
        });

        return trpc.createClient({
            links: [
                wsLink({
                    client: wsClient,
                }),
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
                }),
            ],
            transformer: superjson,
        });
    });

    return (
        <trpc.Provider
            client={trpcClient}
            queryClient={queryClient}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
