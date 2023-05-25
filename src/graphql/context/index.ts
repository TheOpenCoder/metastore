import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

export interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
}

export const context = ({ req }: { req: Request }): Context => {
  // TODO: use cookie instead of header
  // @ts-expect-error
  const token: string | undefined | null = req.headers['x-auth-token'];

  if (!token) {
    return {
      prisma: new PrismaClient(),
      authUser: null,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);

    // TODO: if jwt expired, return null for auth

    return {
      prisma: new PrismaClient(),
      authUser: decoded as Context['authUser'],
    };
  } catch (err) {
    return {
      prisma: new PrismaClient(),
      authUser: null,
    };
  }
};
