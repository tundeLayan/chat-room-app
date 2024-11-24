import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from 'ws';

import { appRouter } from '.';
import { createContext } from './context';

export function createWSServer(port: number) {
    const wss = new WebSocketServer({ port });
    const handler = applyWSSHandler({
        wss,
        router: appRouter,
        createContext,
    });

    wss.on('connection', (ws) => {
        console.log(`++ Connection (${wss.clients.size})`);
        ws.once('close', () => {
            console.log(`-- Connection (${wss.clients.size})`);
        });
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM received');
        handler.broadcastReconnectNotification();
        wss.close();
    });

    return wss;
}
