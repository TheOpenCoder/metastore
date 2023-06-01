import { UserFilterInput } from '../../types/codegen.types';
import UserFilter from '../../types/filters/userFilter';

export const generatePrismaUserFilter = ({
  publicAddress,
  username,
  firstName,
}: UserFilterInput): UserFilter => {
  return {
    AND: [
      {
        publicAddress: {
          equals: publicAddress?.eq as string,
          in: publicAddress?.in as string[],
          not: publicAddress?.ne as string,
          notIn: publicAddress?.nin as string[],
          contains: publicAddress?.contains as string,
        },
      },
      {
        username: {
          equals: username?.eq as string,
          in: username?.in as string[],
          not: username?.ne as string,
          notIn: username?.nin as string[],
          contains: username?.contains as string,
        },
      },
      {
        firstName: {
          equals: firstName?.eq as string,
          in: firstName?.in as string[],
          not: firstName?.ne as string,
          notIn: firstName?.nin as string[],
          contains: firstName?.contains as string,
        },
      },
    ],
  };
};
