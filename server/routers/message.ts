/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

export const messageRouter = createTRPCRouter({
    list: publicProcedure
        .input(z.object({ roomId: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.message.findMany({
                where: { chatRoomId: input.roomId },
                include: {
                    author: true,
                    reactions: {
                        include: { user: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
        }),

    send: publicProcedure
        .input(
            z.object({
                content: z.string(),
                authorId: z.string(),
                roomId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const message = await ctx.prisma.message.create({
                data: {
                    content: input.content,
                    authorId: input.authorId,
                    chatRoomId: input.roomId,
                },
                include: {
                    author: true,
                    reactions: true,
                },
            });
            ee.emit('NEW_MESSAGE', message);
            return message;
        }),

    react: publicProcedure
        .input(
            z.object({
                messageId: z.string(),
                userId: z.string(),
                type: z.enum(['like', 'dislike']),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const reaction = await ctx.prisma.reaction.upsert({
                where: {
                    userId_messageId: {
                        userId: input.userId,
                        messageId: input.messageId,
                    },
                },
                update: { type: input.type },
                create: {
                    type: input.type,
                    userId: input.userId,
                    messageId: input.messageId,
                },
                include: {
                    message: true,
                    user: true,
                },
            });
            ee.emit('NEW_REACTION', reaction);
            return reaction;
        }),

    onNewMessage: publicProcedure
        .input(z.object({ roomId: z.string() }))
        .subscription(({ input }) => {
            return observable((emit) => {
                const onMessage = (message: any) => {
                    if (message.chatRoomId === input.roomId) {
                        emit.next(message);
                    }
                };
                ee.on('NEW_MESSAGE', onMessage);
                return () => {
                    ee.off('NEW_MESSAGE', onMessage);
                };
            });
        }),

    onNewReaction: publicProcedure
        .input(z.object({ roomId: z.string() }))
        .subscription(({ input }) => {
            return observable((emit) => {
                const onReaction = (reaction: any) => {
                    if (reaction.message.chatRoomId === input.roomId) {
                        emit.next(reaction);
                    }
                };
                ee.on('NEW_REACTION', onReaction);
                return () => {
                    ee.off('NEW_REACTION', onReaction);
                };
            });
        }),
});
