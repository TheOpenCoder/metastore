import { PrismaClient, OnlineStatus } from '@prisma/client';

export type PrismaUser = {
  id: string;
  publicAddress: string;
  nonce: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
  userSettings: {
    userId: string;
    onlineStatus: OnlineStatus;
    isPrivate: boolean;
    canReceiveFriendRequests: boolean;
    updatedAt: Date;
  };
  following: {
    followerId: string;
    followingId: string;
    createdAt: Date;
  };
};
