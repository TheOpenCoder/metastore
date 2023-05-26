import * as _ from 'lodash';

type Test = {
  id: string;
};

import {
  Resolvers,
  User,
  UserSettings,
  UserSocials,
} from '../../../types/codegen.types';
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
      const { requestedBy: requests, following: follows } =
        await userLoader.load(parent.id);

      console.log('requests', requests);
      console.log('follows', follows);

      const friendRequests = _.map(requests, (request) => ({
        id: request.requesterId,
      })) as User[];

      const friends = _.map(follows, (friend) => ({
        id: friend.followingId,
      })) as User[];

      return { friends, friendRequests } as UserSocials;
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

  // UserSocials: {
  //   friends: async (parent: any, args: {}, { userLoader }: Context) => {
  //     console.log('parent', parent);

  //     return [] as User[];
  //   },
  // },
};

export default resolvers;
