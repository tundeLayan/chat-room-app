import { z } from 'zod';
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';

import { createTRPCRouter, publicProcedure } from '../trpc';

const ee = new EventEmitter();

// TODO: Change all these events to enums

export const chatRoomRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.chatRoom.findMany({
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
    }),

    join: publicProcedure
        .input(z.object({ userId: z.string(), roomId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const room = await ctx.prisma.chatRoom.update({
                where: { id: input.roomId },
                data: {
                    users: {
                        connect: { id: input.userId },
                    },
                    userCount: { increment: 1 },
                },
            });
            ee.emit('USER_JOINED', {
                roomId: input.roomId,
                userId: input.userId,
            });
            return room;
        }),

    leave: publicProcedure
        .input(z.object({ userId: z.string(), roomId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const room = await ctx.prisma.chatRoom.update({
                where: { id: input.roomId },
                data: {
                    users: {
                        disconnect: { id: input.userId },
                    },
                    userCount: { decrement: 1 },
                },
            });
            ee.emit('USER_LEFT', {
                roomId: input.roomId,
                userId: input.userId,
            });
            return room;
        }),

    onUserActivity: publicProcedure
        .input(z.object({ roomId: z.string() }))
        .subscription(({ input }) => {
            return observable((emit) => {
                const onUserJoined = (data: {
                    roomId: string;
                    userId: string;
                }) => {
                    if (data.roomId === input.roomId) {
                        emit.next({ type: 'joined', userId: data.userId });
                    }
                };

                const onUserLeft = (data: {
                    roomId: string;
                    userId: string;
                }) => {
                    if (data.roomId === input.roomId) {
                        emit.next({ type: 'left', userId: data.userId });
                    }
                };

                ee.on('USER_JOINED', onUserJoined);
                ee.on('USER_LEFT', onUserLeft);

                return () => {
                    ee.off('USER_JOINED', onUserJoined);
                    ee.off('USER_LEFT', onUserLeft);
                };
            });
        }),
});
