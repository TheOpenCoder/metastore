import * as _ from 'lodash';

import {
  Resolvers,
  User,
  OnlineStatus,
  UserSettings,
  UserSocials,
} from '../../../types/codegen.types';
import { ResolverContext } from '../../../types/context';

const resolvers: Resolvers = {
  User: {
    publicAddress: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { publicAddress } = await userLoader.load(parent.id);

      return publicAddress;
    },

    nonce: async (parent: User, args: {}, { userLoader }: ResolverContext) => {
      const { nonce } = await userLoader.load(parent.id);

      return nonce;
    },

    username: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { username } = await userLoader.load(parent.id);

      return username;
    },

    firstName: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { firstName } = await userLoader.load(parent.id);

      return firstName as string;
    },

    lastName: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { lastName } = await userLoader.load(parent.id);

      return lastName as string;
    },

    bio: async (parent: User, args: {}, { userLoader }: ResolverContext) => {
      const { bio } = await userLoader.load(parent.id);

      return bio as string;
    },

    profilePicture: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { profilePicture } = await userLoader.load(parent.id);

      return profilePicture as string;
    },

    onlineStatus: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { onlineStatus } = await userLoader.load(parent.id);

      return onlineStatus as OnlineStatus;
    },

    settings: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { userSettings } = await userLoader.load(parent.id);

      return _.omit(userSettings, ['updatedAt', 'userId']) as UserSettings;
    },

    socials: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { requestedBy: requests, following: follows } =
        await userLoader.load(parent.id);

      const friends = _.map(follows, (friend) => ({
        id: friend.followingId,
      })) as User[];

      const friendRequests = _.map(requests, (request) => ({
        id: request.requesterId,
      })) as User[];

      return { friends, friendRequests } as UserSocials;
    },

    createdAt: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { createdAt } = await userLoader.load(parent.id);

      return createdAt;
    },

    updatedAt: async (
      parent: User,
      args: {},
      { userLoader }: ResolverContext,
    ) => {
      const { updatedAt } = await userLoader.load(parent.id);

      return updatedAt;
    },
  },
};

export default resolvers;
