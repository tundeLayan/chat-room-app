import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, createTRPCRouter } from '../trpc';

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(
            z.object({
                username: z.string().min(3).max(20),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { username } = input;

            try {
                // Check if username already exists
                const existingUser = await ctx.prisma.user.findUnique({
                    where: { username },
                    include: {
                        rooms: true, // Include joined rooms
                        messages: true, // Include user's messages
                        reactions: true, // Include user's reactions
                    },
                });

                if (existingUser) {
                    // If user exists, return the user with their data
                    return existingUser;
                }

                // Create new user if doesn't exist
                const newUser = await ctx.prisma.user.create({
                    data: {
                        username,
                    },
                    include: {
                        rooms: true,
                        messages: true,
                        reactions: true,
                    },
                });

                return newUser;
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to process login',
                });
            }
        }),

    // getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    //     const user = await ctx.prisma.user.findUnique({
    //         where: { id: ctx.user.id },
    //         include: {
    //             rooms: {
    //                 include: {
    //                     messages: {
    //                         include: {
    //                             author: true,
    //                             reactions: true,
    //                         },
    //                         orderBy: {
    //                             createdAt: 'desc',
    //                         },
    //                         take: 50, // Limit initial message load
    //                     },
    //                 },
    //             },
    //         },
    //     });

    //     if (!user) {
    //         throw new TRPCError({
    //             code: 'NOT_FOUND',
    //             message: 'User not found',
    //         });
    //     }

    //     return user;
    // }),
});
