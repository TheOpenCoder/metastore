import { GameFilterInput } from '../../types/codegen.types';
import GameFilter from '../../types/filters/gameFilter';

export const generatePrismaGameFilter = ({
  title,
}: GameFilterInput): GameFilter => {
  return {
    AND: [
      {
        title: {
          equals: title?.eq as string,
          in: title?.in as string[],
          not: title?.ne as string,
          notIn: title?.nin as string[],
          contains: title?.contains as string,
        },
      },
    ],
  };
};
