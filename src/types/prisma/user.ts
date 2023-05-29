import { OnlineStatus } from '@prisma/client';

export default interface PrismaUser {
  id: string;
  publicAddress: string;
  nonce: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePicture: string | null;
  onlineStatus: OnlineStatus;
  createdAt: Date;
  updatedAt: Date;
  userSettings: {
    isPrivate: boolean;
    canReceiveFriendRequests: boolean;
  } | null;
  receivedFollows: {
    followerId: string;
  }[];
  receivedRequests: {
    requesterId: string;
  }[];
}
