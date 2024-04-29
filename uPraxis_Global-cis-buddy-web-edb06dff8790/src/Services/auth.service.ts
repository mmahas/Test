import axios, { AxiosInstance } from 'axios';
// import { getAuthorizationHeader } from './../utils/getAuthorizationHeader';

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  login = async (authCredentials: any) => {
    return await this.instance.post('/login', authCredentials).then((res) => {
      return {
        // email: res.data.email,
        accessToken: res.data.authenticationToken,
        // expiredAt: res.data.expiredAt,
      };
    });
  };
}
