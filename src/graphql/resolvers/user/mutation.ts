import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

import { verifiedSignature } from '../../../auth';
import { generateJWT } from '../../../auth/jwt';
import { generateNonce } from '../../../utils/auth';
import { setAuthCookie } from '../../../auth/cookies';

import {
  Resolvers,
  User,
  RegisterUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../../../types/codegen.types';
import { ResolverContext } from '../../../types/context';

const resolvers: Resolvers = {
  Mutation: {
    // HANDLEERROR: username taken, publicAddress taken
    registerUser: async (
      root: {},
      { input }: { input: RegisterUserInput },
      { prisma, request }: ResolverContext,
    ) => {
      const {
        publicAddress,
        nonce,
        signature,
        username,
        firstName,
        profilePicture,
      } = input;

      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      const randomNonce = generateNonce();

      const user = await prisma.user.create({
        data: {
          publicAddress,
          nonce: randomNonce,
          username,
          firstName,
          profilePicture,
          userSettings: {},
        },
      });

      const { id } = user;

      await setAuthCookie(
        request,
        generateJWT({ id, publicAddress, username }),
      );

      return user as User;
    },

    loginUser: async (
      root: {},
      { input }: { input: LoginUserInput },
      { prisma, request }: ResolverContext,
    ) => {
      const { publicAddress, signature } = input;

      const existingUser = await prisma.user.findUnique({
        where: {
          publicAddress,
        },
      });

      if (!existingUser) throw new GraphQLError("User doesn't exist");

      const { nonce, id } = existingUser;

      if (!verifiedSignature(publicAddress, nonce, signature))
        throw new GraphQLError('Invalid signature');

      const randomNonce = generateNonce();

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          nonce: randomNonce,
        },
      });

      const { username } = user;

      await setAuthCookie(
        request,
        generateJWT({ id, publicAddress, username }),
      );

      return user as User;
    },

    // HANDLEERROR: username taken
    updateUser: async (
      root: {},
      { input }: { input: UpdateUserInput },
      { prisma, authUser }: ResolverContext,
    ) => {
      const {
        username,
        firstName,
        lastName,
        bio,
        profilePicture,
        onlineStatus,
        settings,
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
          onlineStatus: onlineStatus || undefined,
          userSettings: {
            update: {
              isPrivate: settings?.isPrivate || undefined,
              canReceiveFriendRequests:
                settings?.canReceiveFriendRequests || undefined,
            },
          },
        },
      });

      return user as User;
    },

    // HANDLEERROR: friend request already sent
    sendFriendRequest: async (
      root: {},
      { to: requesteeId }: { to: string },
      { prisma, authUser }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          sentRequests: {
            create: {
              requesteeId,
            },
          },
        },
      });

      return true;
    },

    // HANDLEERROR: friend request doesn't exists
    cancelFriendRequest: async (
      root: {},
      { to: requesteeId }: { to: string },
      { prisma, authUser }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          sentRequests: {
            delete: {
              requesterId_requesteeId: {
                requesterId: id,
                requesteeId,
              },
            },
          },
        },
      });

      return true;
    },

    // HANDLEERROR: friend request doesn't exists
    acceptFriendRequest: async (
      root: {},
      { from: requesterId }: { from: string },
      { prisma, authUser }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          receivedRequests: {
            delete: {
              requesterId_requesteeId: {
                requesterId,
                requesteeId: id,
              },
            },
          },

          receivedFollows: {
            create: {
              followerId: requesterId,
            },
          },
        },
      });

      return true;
    },

    // HANDLEERROR: friend request doesn't exists
    declineFriendRequest: async (
      root: {},
      { from: requesterId }: { from: string },
      { prisma, authUser }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          receivedRequests: {
            delete: {
              requesterId_requesteeId: {
                requesterId,
                requesteeId: id,
              },
            },
          },
        },
      });

      return true;
    },
  },
};

export default resolvers;
