import { GameFilterInput } from '../../types/codegen.types';
import GameFilter from '../../types/filters/gameFilter';

export const generatePrismaGameFilter = ({
  title,
  slug,
}: GameFilterInput): GameFilter => {
  return {
    AND: [
      {
        title: {
          equals: title?.eq as string,
          in: title?.in as string[],
          contains: title?.contains as string,
          not: title?.ne as string,
          notIn: title?.nin as string[],
        },
      },
      {
        slug: {
          equals: slug?.eq as string,
          in: slug?.in as string[],
          contains: slug?.contains as string,
          not: slug?.ne as string,
          notIn: slug?.nin as string[],
        },
      },
    ],
  };
};
