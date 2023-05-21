import * as path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ['ts'],
});

const resolvers = mergeResolvers(resolversArray);

export default resolvers;

// mergeResolvers returns the merged object with "default" key which graphql-yoga doesn't like
