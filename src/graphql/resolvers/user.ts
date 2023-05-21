import { PrismaClient } from '@prisma/client';
import { Resolvers } from '../../../types';

const prisma = new PrismaClient();

const resolvers: Resolvers = {
  Query: {
    user: async (_, {}) => {
      return null;
    },
  },
};

export default resolvers;
