import { Resolvers, Game } from '../../../types/codegen.types';

const resolvers: Resolvers = {
  Query: {
    games: async (root: {}, args: {}, { prisma }: any) => {
      return null;
    },
  },
};

export default resolvers;
