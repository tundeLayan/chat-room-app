import { NextApiRequest, NextApiResponse } from 'next';

import { CreateNextContextOptions } from '@trpc/server/adapters/next';
// import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { inferAsyncReturnType } from '@trpc/server';

// import { prisma } from '@/app/_lib/prisma';
import { prisma } from '../app/_lib/prisma';

export function createContext(): ContextBase {
    // opts: CreateNextContextOptions | CreateWSSContextFnOptions
    return {
        prisma,
    };
}

interface ContextBase {
    prisma: typeof prisma;
}

export function createHttpContext(
    opts: CreateNextContextOptions
): ContextBase & {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    const { req, res } = opts;
    return {
        req,
        res,
        prisma,
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;
// export type HTTPContext = inferAsyncReturnType<typeof createHttpContext>;
