import { GraphQLError } from 'graphql';

import { User } from '../types/codegen.types';
import {
  RegisterInput,
  GetUniqueUserUsingPublicAddressInput,
} from '../types/services/user';

export const registerUser = async ({
  publicAddress,
  nonce,
  username,
  firstName,
  profilePicture,
  prisma,
}: RegisterInput) => {
  try {
    const user = await prisma.user.create({
      data: {
        publicAddress,
        nonce,
        username,
        firstName,
        profilePicture,
        userSettings: {
          create: {},
        },
      },
    });

    return user as User;
  } catch (err) {
    throw new GraphQLError('Error creating user');
  }
};

export const getUniqueUserUsingPublicAddress = async ({
  publicAddress,
  prisma,
}: GetUniqueUserUsingPublicAddressInput) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        publicAddress,
      },
    });

    return user as User;
  } catch (err) {
    throw new GraphQLError('Error fetching user');
  }
};
