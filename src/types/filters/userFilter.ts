export default interface UserFilter {
  AND: [
    {
      publicAddress: {
        equals: string;
        in: string[];
        not: string;
        notIn: string[];
      };
    },
    {
      username: {
        equals: string;
        in: string[];
        not: string;
        notIn: string[];
      };
    },
    {
      firstName: {
        equals: string;
        in: string[];
        not: string;
        notIn: string[];
      };
    },
  ];
}
