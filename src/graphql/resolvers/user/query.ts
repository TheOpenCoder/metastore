import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

import { Resolvers, User } from '../../../types/codegen.types';
import Context from '../../../types/context';

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
};

export default resolvers;
