import * as express from 'express';
import { createYoga } from 'graphql-yoga';
// import serverlessHttp from 'serverless-http';

import schema from './schema';

// Constants
const PORT = 5000;

const app = express();
const yoga = createYoga({});

app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
