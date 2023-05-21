import { PrismaClient } from '@prisma/client';
import {
  Resolvers,
  RegisterUserInput,
  OnlineStatus,
  User,
} from '../../../types';

const prisma = new PrismaClient();

import * as _ from 'lodash';

// const user: User = {
//   id: '1',
//   publicAddress: '0x123456789',
//   username: 'test',
//   firstName: 'test',
//   lastName: 'test',
//   bio: 'test',
//   profilePicture: 'https://www.google.com',
//   userSettings: {
//     onlineStatus: OnlineStatus.Away,
//     isPrivate: true,
//     canReceiveFriendRequest: true,
//   },
//   // friends: [],
//   // friendRequests: [],
//   // reviews: [],
//   // achievements: [],
//   // libraryGames: [],
//   // favoriteGames: [],
//   // ownedAddons: [],
//   // favoriteAddons: [],
//   // createdOrgs: [],
//   // joinedOrgs: [],
//   // totalAchievements: null,
//   // totalHoursPlayed: 10,
//   // totalFriends: 2,
//   createdAt: '2021-08-01T00:00:00.000Z',
//   updatedAt: '2021-08-01T00:00:00.000Z',
// };

const resolvers: Resolvers = {
  Query: {
    // @ts-expect-error
    user: async (_: {}, { id }: { id: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    },

    // @ts-expect-error
    users: async () => {
      const users = await prisma.user.findMany();

      _.every(users, (user) => {
        console.log(user.userSettingsId);
      });

      const newUsers = _.map(users, (user) => _.omit(user, 'userSettingsId'));
      console.log(newUsers);

      return newUsers;
    },
  },

  Mutation: {
    // @ts-expect-error
    registerUser: async (_: {}, { input }: { input: RegisterUserInput }) => {
      const { publicAddress, username, firstName, profilePicture } = input;
      const user = await prisma.user.create({
        data: {
          publicAddress,
          username,
          firstName,
          profilePicture,
          userSettings: {
            create: {},
          },
        },
      });

      return user;
    },
  },

  User: {
    // @ts-expect-error
    settings: async (parent: any) => {
      console.log('parent id', parent.id);

      const userSettings = await prisma.userSettings.findUnique({
        where: {
          id: parent.userSettingsId,
        },
      });

      return _.pick(userSettings, [
        'onlineStatus',
        'isPrivate',
        'canReceiveFriendRequests',
      ]);
    },
  },
};

export default resolvers;
