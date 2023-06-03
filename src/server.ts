// dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });
import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { yoga } from './yoga';
import * as functions from 'firebase-functions';
import * as cors from 'cors';

import { PORT } from './utils/constants';

const app = express();

app.use(cors());
// @ts-expect-error
app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server at /graphql`);
});

exports.graphql = functions.https.onRequest(app);
