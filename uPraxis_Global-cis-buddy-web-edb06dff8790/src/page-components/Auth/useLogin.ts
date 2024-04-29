/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { authService } from './../../Services';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const login = async (authCredentials: any) => {
    const admin = await authService.login(authCredentials);
    if (admin !== null) {
      Cookies.set('token', admin.accessToken);
    }
    return admin;
  };

  return { login };
};
