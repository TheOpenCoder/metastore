import * as jwt from 'jsonwebtoken';

import DecodedJWT from '../types/decodedJWT';

export const generateJWT = ({
  id,
  publicAddress,
  username,
}: DecodedJWT): string => {
  return jwt.sign(
    { id, publicAddress, username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  );
};

export const verifyJWT = (token: string): DecodedJWT => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedJWT;
};
