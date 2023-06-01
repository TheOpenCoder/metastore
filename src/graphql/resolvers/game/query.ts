import { Resolvers, Game } from '../../../types/codegen.types';

const resolvers: Resolvers = {
  Query: {
    games: async (root: {}, args: {}, { prisma }: any) => {
      const games = (await prisma.game.findMany({})) as Game[];

      return games;
    },

    game: async (root: {}, { id }: { id: string }, { prisma }: any) => {
      const game = (await prisma.game.findUnique({
        where: {
          id,
        },
      })) as Game;

      return game;
    },
  },
};

export default resolvers;
