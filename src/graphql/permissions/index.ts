import { shield, rule } from 'graphql-shield';
import { GraphQLError } from 'graphql';

export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  if (ctx.authUser === null) return new GraphQLError('Not Authenticated');

  return true;
});

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      updateUser: isAuthenticated,
      sendFriendRequest: isAuthenticated,
      cancelFriendRequest: isAuthenticated,
      acceptFriendRequest: isAuthenticated,
      declineFriendRequest: isAuthenticated,
    },
  },
  { allowExternalErrors: true },
);
