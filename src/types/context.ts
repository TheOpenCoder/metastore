import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  userLoader: DataLoader<string, any, string>;
  gameLoader: DataLoader<string, any, string>;
}

export interface ResolverContext {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  userLoader: DataLoader<string, any, string>;
  gameLoader: DataLoader<string, any, string>;
  request: Request;
  response: Response;
}
