import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

export const verifiedSignature = (
  publicAddress: string,
  nonce: number,
  signature: string,
): boolean => {
  if (process.env.NODE_ENV === 'development') return true;

  const msg = `Login to Metastore Nonce: ${nonce}`;
  const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
  const decodedPublicAddress = recoverPersonalSignature({
    data: msgBufferHex,
    signature,
  });

  if (decodedPublicAddress.toLowerCase() !== publicAddress.toLowerCase())
    return false;

  return true;
};
