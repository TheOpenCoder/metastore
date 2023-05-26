import { PrismaClient, User } from '@prisma/client';
import PrismaUser from '../types/prisma.user';

// TODO: fix the types
export default async (
  ids: readonly string[],
  prisma: PrismaClient,
): Promise<any> => {
  const keys = [...ids];

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: keys,
      },
    },
    include: {
      userSettings: true,
      requestedBy: {
        select: {
          requesterId: true,
        },
      },
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });

  // console.log('users', users);

  return ids.map((id) => users.find((user) => user.id === id));
};

// actual code to build dataloader
// const getUsers = async (ids: readonly string[]) => {
//   console.log('getUser', ids);
//   const users = await

//   return ids.map((id) => users.find((user) => user.id === id)) as User[];
// };
