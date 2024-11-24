import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import superjson from 'superjson';

import { AppRouter } from '@/server';

const wsClient = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
});

export const trpcClient = createTRPCProxyClient<AppRouter>({
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
