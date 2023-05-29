import { createYoga, createSchema } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { useCookies } from '@whatwg-node/server-plugin-cookies';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { context } from './graphql/context';
import { permissions } from './graphql/permissions';

const schema = createSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, permissions);

export const yogaConfig =
  process.env.NODE_ENV !== 'production'
    ? {
        schema: schemaWithPermissions,
        context,
        plugins: [useCookies()],
      }
    : {
        schema: schemaWithPermissions,
        context,
        plugins: [
          useCSRFPrevention({
            requestHeaders: ['x-graphql-yoga-csrf'],
          }),
          useCookies(),
        ],
      };

export const yoga = createYoga(yogaConfig);
