import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });
import * as express from 'express';
import { createYoga, createSchema } from 'graphql-yoga';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { PORT } from './utils';

const schema = createSchema({
  typeDefs,
  resolvers,
});

const app = express();
const yoga = createYoga({ schema });

app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server at http://localhost:${PORT}/graphql`);
});
