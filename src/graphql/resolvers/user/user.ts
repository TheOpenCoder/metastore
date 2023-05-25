import * as _ from 'lodash';

import { Resolvers, User, UserSettings } from '../../../types/codegen.types';
import Context from '../../../types/context';

const resolvers: Resolvers = {
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

    settings: async (parent: User, args: {}, { userLoader }: Context) => {
      const { userSettings } = await userLoader.load(parent.id);
      return _.omit(userSettings, ['updatedAt', 'userId']) as UserSettings;
    },

    socials: async (parent: User, args: {}, { userLoader }: Context) => {
      const { socials } = await userLoader.load(parent.id);
      return { friends: [], friendRequests: [] } as {
        friends: User[];
        friendRequests: User[];
      };
    },

    createdAt: async (parent: User, args: {}, { userLoader }: Context) => {
      const { createdAt } = await userLoader.load(parent.id);
      return createdAt;
    },

    updatedAt: async (parent: User, args: {}, { userLoader }: Context) => {
      const { updatedAt } = await userLoader.load(parent.id);
      return updatedAt;
    },
  },
};

export default resolvers;
