import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });
import * as express from 'express';
import { createYoga } from 'graphql-yoga';
// import serverlessHttp from 'serverless-http';

import { schema } from './schema';

// Constants
const PORT: string = process.env.PORT || '5000';

const app = express();
const yoga = createYoga({ schema });

app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server at http://localhost:${PORT}/graphql`);
});
