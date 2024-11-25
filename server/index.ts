import { userRouter } from './routers/user';
import { chatRoomRouter } from './routers/chatRoom';
import { messageRouter } from './routers/message';
import { createTRPCRouter } from './trpc';
import { authRouter } from './routers/auth';

export const appRouter = createTRPCRouter({
    user: userRouter,
    chatRoom: chatRoomRouter,
    message: messageRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
