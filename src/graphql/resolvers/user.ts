import { PrismaClient } from '@prisma/client';
import {
  Resolvers,
  RegisterUserInput,
  UpdateUserInput,
  OnlineStatus,
  UserSettings,
  User,
  LoginUserInput,
} from '../../../types';
import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  req: Request;
  res: Response;
}

import { verifiedSignature, generateJWT } from '../../auth';
import { generateNonce } from './../../utils';

// const user: User = {
//   id: '1',
//   publicAddress: '0x123456789',
//   username: 'test',
//   firstName: 'test',
//   lastName: 'test',
//   bio: 'test',
//   profilePicture: 'https://www.google.com',
//   settings: {
//     onlineStatus: OnlineStatus.Away,
//     isPrivate: true,
//     canReceiveFriendRequests: true,
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
    user: async (root: {}, { id }: { id: string }, { prisma }: Context) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) throw new GraphQLError("User doesn't exist");

        return user as User;
      } catch (err) {
        throw new GraphQLError('Error fetching user');
      }
    },

    users: async (root: {}, args: {}, { prisma }: Context) => {
      try {
        const users = await prisma.user.findMany();

        return users as [User];
      } catch (err) {
        throw new GraphQLError("Can't fetch users");
      }
    },

    me: async (root: {}, args: {}, { prisma, authUser }: Context) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) throw new GraphQLError("User doesn't exist");

        return user as User;
      } catch (err) {
        throw new GraphQLError('Error fetching user');
      }
    },
  },

  Mutation: {
    registerUser: async (
      root: {},
      { input }: { input: RegisterUserInput },
      { prisma, res }: Context,
    ) => {
      const {
        publicAddress,
        nonce,
        signature,
        username,
        firstName,
        profilePicture,
      } = input;

      // verify signature else throw error
      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      // generate new random nonce
      const randomNonce = generateNonce();

      try {
        const user = await prisma.user.create({
          data: {
            publicAddress,
            nonce: randomNonce,
            username,
            firstName,
            profilePicture,
            // must create user settings here
            userSettings: {
              create: {},
            },
          },
        });

        // @ts-ignore
        res.headers['x-auth-token'] = generateJWT(user);

        return user as User;
      } catch (err) {
        // TODO: handle errors
        // publicAddress taken (which implies user already exists)
        // username taken

        throw new GraphQLError('Error creating user');
      }
    },

    loginUser: async (
      root: {},
      { input }: { input: LoginUserInput },
      { prisma, res }: Context,
    ) => {
      const { publicAddress, signature } = input;

      const { nonce, id } = (await prisma.user.findUnique({
        where: {
          publicAddress,
        },

        select: {
          nonce: true,
          id: true,
        },
      })) as { nonce: number; id: string };

      // verify signature else throw error
      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        // @ts-ignore
        res.headers['x-auth-token'] = generateJWT(user);

        return user as User;
      } catch (err) {
        throw new GraphQLError('Error logging in user');
      }
    },

    updateUser: async (
      root: {},
      { input }: { input: UpdateUserInput },
      { prisma, authUser }: Context,
    ) => {
      const {
        username,
        firstName,
        lastName,
        bio,
        profilePicture,
        userSettings,
      } = input;

      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      const user = await prisma.user.update({
        where: { id },
        data: {
          username: username || undefined,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          bio: bio || undefined,
          profilePicture: profilePicture || undefined,
          userSettings: {
            update: {
              onlineStatus: userSettings?.onlineStatus || undefined,
              isPrivate: userSettings?.isPrivate || undefined,
              canReceiveFriendRequests:
                userSettings?.canReceiveFriendRequests || undefined,
            },
          },
        },
      });

      return user as User;
    },

    deleteUser: async (
      root: {},
      { signature }: { signature: string },
      { prisma, authUser }: Context,
    ) => {
      // TODO: get nonce from db & verify signature else throw error

      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      try {
        const user = await prisma.user.delete({
          where: { id },
        });

        return true;
      } catch (err) {
        throw new GraphQLError('Error deleting user');
      }
    },

    // sendFriendRequest: async (_: {}, { id }: { id: string }) => {
    //   const user = await prisma.user.update({
    //     where: {
    //       id,
    //     },
    //     data: {
    //       friendRequests: {
    //         create: {},
    //       },
    //     },
    //   });

    //   console.log(user);

    //   return user;
    // },
  },

  User: {
    settings: async (parent: User, args: {}, { prisma }: Context) => {
      const userSettings = await prisma.userSettings.findUnique({
        where: {
          userId: parent.id,
        },
      });

      return _.omit(userSettings, ['userId', 'updatedAt']) as UserSettings;
    },
  },
};

export default resolvers;
