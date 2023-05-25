import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export default interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  userLoader: DataLoader<string, any, string>;
  req: Request;
  res: Response;
}
