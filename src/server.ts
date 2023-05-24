import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });
import * as express from 'express';
import { createYoga, createSchema } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { context } from './graphql/context';
import { permissions } from './graphql/permissions';
import { PORT } from './utils';

const schema = createSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, permissions);

const app = express();
const yoga = createYoga({
  schema: schemaWithPermissions,
  context,
});

// @ts-ignore
app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server at http://localhost:${PORT}/graphql`);
});
