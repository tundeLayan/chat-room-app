import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({ username: z.string().min(3) }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.upsert({
                where: { username: input.username },
                update: {},
                create: { username: input.username },
            });
            return user;
        }),

    getUser: publicProcedure
        .input(z.object({ username: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: { username: input.username },
            });
        }),
});
