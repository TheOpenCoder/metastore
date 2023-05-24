import { shield, rule, allow, deny } from 'graphql-shield';
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
      deleteUser: isAuthenticated,
      sendFriendRequest: isAuthenticated,
      acceptFriendRequest: isAuthenticated,
    },
  },
  { allowExternalErrors: true },
);
