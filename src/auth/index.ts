export const verifiedSignature = (
  publicAddress: string,
  nonce: number,
  signature: string,
): boolean => {
  if (process.env.NODE_ENV === 'development') return true;
  return false;
};
