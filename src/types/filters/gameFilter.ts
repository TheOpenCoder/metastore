export default interface GameFilter {
  AND: [
    {
      title: {
        equals: string;
        in: string[];
        contains: string;
        not: string;
        notIn: string[];
      };
    },
  ];
}
