import * as _ from 'lodash';
import { GraphQLError } from 'graphql';

import { Resolvers, CreateGameInput, Game } from '../../../types/codegen.types';
import { ResolverContext } from '../../../types/context';

const resolvers: Resolvers = {
  Mutation: {
    buyGame: async (
      parent: {},
      { gameId }: { gameId: string },
      { authUser, prisma }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not authenticated');

      const { id } = authUser;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          libraryGames: {
            create: {
              gameId,
            },
          },
        },
      });

      return true;
    },

    createGame: async (
      parent: {},
      { input }: { input: CreateGameInput },
      { authUser, prisma }: ResolverContext,
    ) => {
      if (!authUser) throw new GraphQLError('Not authenticated');

      const { id } = authUser;

      const game = await prisma.game.create({
        data: {
          ...input,
        },
      });

      return game as Game;
    },
  },
};

export default resolvers;
