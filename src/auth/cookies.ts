export const getAuthCookie = async (request: Request) => {
  return await request.cookieStore?.get('auth');
};

export const setAuthCookie = async (request: Request, jwt: string) => {
  await request.cookieStore?.set('auth', jwt);
};
