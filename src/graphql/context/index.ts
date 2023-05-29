import { PrismaClient } from '@prisma/client';
import * as DataLoader from 'dataloader';

import { getAuthCookie } from '../../auth/cookies';
import { verifyJWT } from '../../auth/jwt';
import batchUsers from '../../dataloaders/user';

import { Context } from '../../types/context';
import { User } from '../../types/codegen.types';

const prisma = new PrismaClient({
  log: ['query'],
});

export const context = async ({
  request,
}: {
  request: Request;
}): Promise<Context> => {
  // TODO: handle JWT & Cookie expiration

  const authCookie = await getAuthCookie(request);
  const token = authCookie?.value;

  if (!token) {
    return {
      prisma,
      authUser: null,
      userLoader: new DataLoader<string, User>((ids: readonly string[]) =>
        batchUsers(ids, prisma),
      ),
    };
  }

  try {
    const decodedJWT = verifyJWT(token);

    return {
      prisma,
      authUser: decodedJWT as Context['authUser'],
      userLoader: new DataLoader<string, User>((ids: readonly string[]) =>
        batchUsers(ids, prisma),
      ),
    };
  } catch (err) {
    return {
      prisma,
      authUser: null,
      userLoader: new DataLoader<string, User>((ids: readonly string[]) =>
        batchUsers(ids, prisma),
      ),
    };
  }
};
