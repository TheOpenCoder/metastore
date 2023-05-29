import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

import { generatePrismaUserFilter } from '../../../utils/prismaFilter';

import { Resolvers, User, UserFilterInput } from '../../../types/codegen.types';
import Context from '../../../types/context';

const resolvers: Resolvers = {
  Query: {
    users: async (
      root: {},
      { filter }: { filter: UserFilterInput },
      { prisma }: Context,
    ) => {
      const userFilter = generatePrismaUserFilter(filter);

      try {
        const users = await prisma.user.findMany({
          where: {
            ...userFilter,
          },
        });

        return (users.length ? users : null) as [User] | null;
      } catch (err) {
        throw new GraphQLError('Error fetching users');
      }
    },

    user: async (root: {}, { id }: { id: string }, { prisma }: Context) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        // HANDLEERROR: user not found

        return user as User;
      } catch (err) {
        throw new GraphQLError('Error fetching user');
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

        // HANDLEERROR: user not found

        return user as User;
      } catch (err) {
        throw new GraphQLError('Error fetching user');
      }
    },

    db: async (root: {}, args: {}, { prisma }: Context) => {
      return true;
    },
  },
};

export default resolvers;
