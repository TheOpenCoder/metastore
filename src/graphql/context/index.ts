import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as DataLoader from 'dataloader';
import batchUsers from '../../dataloaders/user';
import { User } from '../../../types';

export interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  userLoader: DataLoader<string, User, string>;
}

const prisma = new PrismaClient();
const userLoader = new DataLoader<string, User>((ids: readonly string[]) =>
  batchUsers(ids, prisma),
);

export const context = ({ req }: { req: Request }): Context => {
  // TODO: use cookie instead of header
  // @ts-expect-error
  const token: string | undefined | null = req.headers['x-auth-token'];

  if (!token) {
    return {
      prisma,
      authUser: null,
      userLoader,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);

    // TODO: if jwt expired, return null for auth

    return {
      prisma,
      authUser: decoded as Context['authUser'],
      userLoader,
    };
  } catch (err) {
    return {
      prisma,
      authUser: null,
      userLoader,
    };
  }
};
