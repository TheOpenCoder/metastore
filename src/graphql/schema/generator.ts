import * as fs from 'fs';
import * as path from 'path';
import { print } from 'graphql';

// console.log(path.join(path.resolve(__dirname, '..'), '/typeDefs')); // Prints the name of the current directory (i.e. the last part of the

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typeDefsArray = loadFilesSync(
  path.join(path.resolve(__dirname, '..'), '/typeDefs'),
  {
    extensions: ['graphql'],
  },
);

const typeDefs = mergeTypeDefs(typeDefsArray);
const printableSchema = print(typeDefs);

fs.writeFileSync(path.join(__dirname, '/schema.graphql'), printableSchema);
