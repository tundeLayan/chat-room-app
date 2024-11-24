import { userRouter } from './routers/user';
import { chatRoomRouter } from './routers/chatRoom';
import { messageRouter } from './routers/message';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
    user: userRouter,
    chatRoom: chatRoomRouter,
    message: messageRouter,
});

export type AppRouter = typeof appRouter;
