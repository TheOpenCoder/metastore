import { GraphQLError } from 'graphql';

import { generatePrismaUserFilter } from '../../../utils/prismaFilters/userFilter';

import { ResolverContext } from '../../../types/context';
import { Resolvers, User, UserFilterInput } from '../../../types/codegen.types';

const resolvers: Resolvers = {
  Query: {
    users: async (
      root: {},
      { filter }: { filter: UserFilterInput },
      { prisma }: ResolverContext,
    ) => {
      const userFilter = generatePrismaUserFilter(filter);

      const users = await prisma.user.findMany({
        where: {
          ...userFilter,
        },
      });

      return (users.length ? users : null) as [User] | null;
    },

    user: async (
      root: {},
      { id }: { id: string },
      { prisma }: ResolverContext,
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return (user ? user : null) as User | null;
    },

    me: async (root: {}, args: {}, { prisma, authUser }: ResolverContext) => {
      if (!authUser) throw new GraphQLError('Not Authenticated');
      const { id } = authUser;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user as User;
    },

    db: async (
      root: {},
      args: {},
      { request, authUser, prisma }: ResolverContext,
    ) => {
      return true;
    },
  },
};

export default resolvers;
