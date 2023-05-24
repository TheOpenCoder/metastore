import { PrismaClient } from '@prisma/client';
import {
  Resolvers,
  RegisterUserInput,
  UpdateUserInput,
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
        throw new GraphQLError('Error fetching users');
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

        if (!user) throw new Error("User doesn't exist");

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

        // TODO: use cookie instead
        // @ts-expect-error
        res.header('x-auth-token', generateJWT(user));

        return user as User;
      } catch (err) {
        // TODO: publicAddress taken (which implies user already exists) & username taken

        throw new GraphQLError('Error creating user');
      }
    },

    loginUser: async (
      root: {},
      { input }: { input: LoginUserInput },
      { prisma, res }: Context,
    ) => {
      const { publicAddress, signature } = input;

      // TODO: use try catch
      const tempUser = (await prisma.user.findUnique({
        where: {
          publicAddress,
        },

        select: {
          nonce: true,
          id: true,
        },
      })) as User;

      if (!tempUser) throw new GraphQLError("User doesn't exist");

      const { nonce, id } = tempUser;

      // verify signature else throw error
      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      const randomNonce = generateNonce();

      try {
        // both replace nonce and return user
        const user = await prisma.user.update({
          where: {
            id,
          },
          data: {
            nonce: randomNonce,
          },
        });

        if (!user) throw new GraphQLError("User doesn't exist");

        // TODO: use cookie instead
        // @ts-expect-error
        res.header('x-auth-token', generateJWT(user));

        return user as User;
      } catch (err) {
        console.log(err);

        throw new GraphQLError('Error logging in user');
      }
    },

    updateUser: async (
      root: {},
      { input }: { input: UpdateUserInput },
      { prisma, authUser }: Context,
    ) => {
      const { username, firstName, lastName, bio, profilePicture, settings } =
        input;

      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      try {
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
                onlineStatus: settings?.onlineStatus || undefined,
                isPrivate: settings?.isPrivate || undefined,
                canReceiveFriendRequests:
                  settings?.canReceiveFriendRequests || undefined,
              },
            },
          },
        });

        return user as User;
      } catch (err) {
        // TODO: handle username taken error
        throw new GraphQLError('Error updating user');
      }
    },

    deleteUser: async (
      root: {},
      { signature }: { signature: string },
      { prisma, authUser }: Context,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      // TODO: use try catch
      const tempUser = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          nonce: true,
          publicAddress: true,
        },
      });

      if (!tempUser) throw new GraphQLError("User doesn't exist");

      const { nonce, publicAddress } = tempUser;

      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      try {
        const deleteUserSettings = prisma.userSettings.delete({
          where: { userId: id },
        });

        const deleteUser = prisma.user.delete({
          where: { id },
        });

        const transaction = await prisma.$transaction([
          deleteUserSettings,
          deleteUser,
        ]);

        return true;
      } catch (err) {
        console.log(err);

        throw new GraphQLError('Error deleting user');
      }
    },

    sendFriendRequest: async (
      root: {},
      { to: requestingId }: { to: string },
      { prisma, authUser }: Context,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id: requesterId } = authUser;

      try {
        // await prisma.requests.create({
        //   data: {
        //     requesterId,
        //     requestingId,
        //   },
        // });

        const tempUser = await prisma.user.findUnique({
          where: {
            id: requesterId,
          },
          include: {
            requestedBy: {},
          },
        });

        console.log(tempUser);

        return true;
      } catch (err) {
        throw new GraphQLError('Error sending friend request');
      }
    },
  },

  User: {
    settings: async (parent: User, args: {}, { prisma }: Context) => {
      try {
        const userSettings = await prisma.userSettings.findUnique({
          where: {
            userId: parent.id,
          },
        });

        return _.omit(userSettings, ['userId', 'updatedAt']) as UserSettings;
      } catch (err) {
        throw new GraphQLError('Error fetching user settings');
      }
    },
  },
};

export default resolvers;
