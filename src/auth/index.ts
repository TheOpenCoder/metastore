import jwt from 'jsonwebtoken';

interface DecodedJWT {
  id: string;
  publicAddress: string;
  username: string;
}

export const verifiedSignature = (
  publicAddress: string,
  nonce: number,
  signature: string,
): boolean => {
  if (process.env.NODE_ENV === 'development') return true;
  return false;
};

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
