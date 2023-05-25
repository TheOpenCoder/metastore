import * as _ from 'lodash';
import { GraphQLError } from 'graphql';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import DataLoader from 'dataloader';

import {
  Resolvers,
  RegisterUserInput,
  UpdateUserInput,
  UserSettings,
  User,
  LoginUserInput,
  OnlineStatus,
} from '../../../types';
import { verifiedSignature, generateJWT } from '../../auth';
import { generateNonce } from './../../utils';

// types
interface Context {
  prisma: PrismaClient;
  authUser: {
    id: string;
    publicAddress: string;
    username: string;
  } | null;
  req: Request;
  res: Response;
  userLoader: DataLoader<string, any, string>;
}

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

    users: async (root: {}, args: {}, { prisma, authUser }: Context) => {
      try {
        const users = await prisma.user.findMany({});

        return users as [User];
      } catch (err) {
        throw new GraphQLError('Error fetching users');
      }
      // const filteredUsers = localUsers.filter(
      //   (user) => user.id != '4' && user.id != '5',
      // );
      // const newUser = _.map(filteredUsers, (user) => ({ id: user.id }));
      // return newUser as [User];
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

    db: async (root: {}, args: {}, { prisma }: Context) => {
      // do db stuff here
      const result = await prisma.user.findUnique({
        where: {
          id: '426b8d28-be41-493b-9716-61bd2414703f',
        },
        include: {
          requestedBy: true,
        },
      });

      console.log(result?.requestedBy);

      return true;
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
    publicAddress: async (parent: User, args: {}, { userLoader }: Context) => {
      const { publicAddress } = await userLoader.load(parent.id);
      return publicAddress;
    },

    nonce: async (parent: User, args: {}, { userLoader }: Context) => {
      const { nonce } = await userLoader.load(parent.id);
      return nonce;
    },

    username: async (parent: User, args: {}, { userLoader }: Context) => {
      const { username } = await userLoader.load(parent.id);
      return username;
    },

    firstName: async (parent: User, args: {}, { userLoader }: Context) => {
      const { firstName } = await userLoader.load(parent.id);
      return firstName as string;
    },

    lastName: async (parent: User, args: {}, { userLoader }: Context) => {
      const { lastName } = await userLoader.load(parent.id);
      return lastName as string;
    },

    bio: async (parent: User, args: {}, { userLoader }: Context) => {
      const { bio } = await userLoader.load(parent.id);
      return bio as string;
    },

    profilePicture: async (parent: User, args: {}, { userLoader }: Context) => {
      const { profilePicture } = await userLoader.load(parent.id);
      return profilePicture as string;
    },

    createdAt: async (parent: User, args: {}, { userLoader }: Context) => {
      const { createdAt } = await userLoader.load(parent.id);
      return createdAt;
    },

    updatedAt: async (parent: User, args: {}, { userLoader }: Context) => {
      const { updatedAt } = await userLoader.load(parent.id);
      return updatedAt;
    },

    settings: async (parent: User, args: {}, { userLoader }: Context) => {
      const { userSettings } = await userLoader.load(parent.id);
      return _.omit(userSettings, ['updatedAt', 'userId']) as UserSettings;
    },

    friends: async (parent: User, args: {}, { userLoader }: Context) => {
      const { requestedBy } = await userLoader.load(parent.id);
      const friends = _.map(requestedBy, (request) => ({
        id: request.requesterId,
      }));

      return friends as User[];
    },
  },
};

export default resolvers;
