import * as path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typeDefsArray = loadFilesSync(path.join(__dirname), {
  extensions: ['graphql'],
});

const typeDefs = mergeTypeDefs(typeDefsArray);

export default typeDefs;

// Use below code to generate a single file with all the type definitions
// import * as fs from 'fs';
// import { print } from 'graphql';
// const printedTypeDefs = print(types);
// fs.writeFileSync('joined.graphql', printedTypeDefs);
