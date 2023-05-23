const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 5000;

export { PORT };

export const generateNonce = (): number => {
  return Math.floor(Math.random() * 99) + 1;
};
