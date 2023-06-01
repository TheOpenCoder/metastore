import { Resolvers, Game, GameFilterInput } from '../../../types/codegen.types';
import { generatePrismaGameFilter } from '../../../utils/prismaFilters/gamefilter';

const resolvers: Resolvers = {
  Query: {
    games: async (
      root: {},
      { filter }: { filter: GameFilterInput },
      { prisma }: any,
    ) => {
      const gameFilter = generatePrismaGameFilter(filter);

      const games = (await prisma.game.findMany({
        where: {
          ...gameFilter,
        },
      })) as Game[];

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
