import { PrismaClient } from '@prisma/client';

export interface RegisterInput {
  publicAddress: string;
  nonce: number;
  username: string;
  firstName: string | undefined | null;
  profilePicture: string | undefined | null;
  prisma: PrismaClient;
}

export interface GetUniqueUserUsingPublicAddressInput {
  publicAddress: string;
  prisma: PrismaClient;
}
