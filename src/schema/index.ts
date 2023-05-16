import { createSchema } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CreateUserInput = {
  input: {
    username: string;
    email: string;
  };
};

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      username: String!
      email: String!
    }

    type Query {
      users: [User]!
      user(id: ID!): User
    }

    input CreateUserInput {
      username: String!
      email: String!
    }

    type Mutation {
      createUser(input: CreateUserInput): User!
    }
  `,
  resolvers: {
    Query: {
      users: async () => {
        const result = await prisma.user.findMany();
        console.log(result);
        return result;
      },
      user: (_, args) => null,
    },

    Mutation: {
      createUser: async (_, args: CreateUserInput) => {
        const result = await prisma.user.create({
          data: {
            username: args.input.username,
            email: args.input.email,
          },
        });
        console.log(result);
        return result;
      },
    },
  },
});
