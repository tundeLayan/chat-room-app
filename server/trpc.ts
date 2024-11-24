import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';

// import { prisma } from '@/app/_lib/prisma';
import { prisma } from '../app/_lib/prisma';
import { Context } from './context';

// type CreateContextOptions = Record<string, never>;

export const createInnerTRPCContext = async () => {
    return {
        prisma,
    };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
    const innerContext = await createInnerTRPCContext();
    return {
        ...innerContext,
        req: opts.req,
        res: opts.res,
    };
};

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
