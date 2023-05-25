export const generateNonce = (): number => {
  return Math.floor(Math.random() * 99) + 1;
};
