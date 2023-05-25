import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '../../types';

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
      requestedBy: true,
    },
  });

  console.log('users', users);

  return ids.map((id) => users.find((user) => user.id === id));
};

// const getUsers = async (ids: readonly string[]) => {
//   console.log('getUser', ids);
//   const users = await

//   return ids.map((id) => users.find((user) => user.id === id)) as User[];
// };
