import { PrismaClient } from '@prisma/client';
import * as DataLoader from 'dataloader';

import batchUsers from '../../dataloaders/user';
import { verifyJWT } from '../../auth/jwt';

import { User } from '../../types/codegen.types';
import Context from '../../types/context';

const prisma = new PrismaClient({
  log: ['query'],
});
const userLoader = new DataLoader<string, User>((ids: readonly string[]) =>
  batchUsers(ids, prisma),
);

export const context = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context => {
  // TODO: use cookie instead
  // @ts-expect-error
  const token: string | undefined | null = req.headers['x-auth-token'];

  if (!token) {
    return {
      prisma,
      authUser: null,
      userLoader,
      req,
      res,
    };
  }

  try {
    const decodedJWT = verifyJWT(token);

    // TODO: handle JWT expiration

    return {
      prisma,
      authUser: decodedJWT as Context['authUser'],
      userLoader,
      req,
      res,
    };
  } catch (err) {
    return {
      prisma,
      authUser: null,
      userLoader,
      req,
      res,
    };
  }
};
