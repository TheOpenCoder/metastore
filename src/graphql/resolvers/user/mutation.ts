import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

import { verifiedSignature } from '../../../auth';
import { generateJWT } from '../../../auth/jwt';
import { generateNonce } from '../../../utils/auth';

import {
  Resolvers,
  User,
  RegisterUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../../../types/codegen.types';
import Context from '../../../types/context';

const resolvers: Resolvers = {
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
        throw new GraphQLError('Error deleting user');
      }
    },

    // sendFriendRequest: async (
    //   root: {},
    //   { to: requestingId }: { to: string },
    //   { prisma, authUser }: Context,
    // ) => {
    //   if (!authUser) throw new GraphQLError('Not Authenticated');
    //   const { id: requesterId } = authUser;

    //   try {
    //     // await prisma.requests.create({
    //     //   data: {
    //     //     requesterId,
    //     //     requestingId,
    //     //   },
    //     // });

    //     const tempUser = await prisma.user.findUnique({
    //       where: {
    //         id: requesterId,
    //       },
    //       include: {
    //         requestedBy: {},
    //       },
    //     });

    //     console.log(tempUser);

    //     return true;
    //   } catch (err) {
    //     throw new GraphQLError('Error sending friend request');
    //   }
    // },
  },
};

export default resolvers;
