// dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });
import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { yoga } from './yoga';

import { PORT } from './utils/constants';

const app = express();

// @ts-expect-error
app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server at http://localhost:${PORT}/graphql`);
});
