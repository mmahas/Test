import axios, { AxiosInstance } from 'axios';
import { getAuthorizationHeader } from './../utils/getAuthorizationHeader';

export class JobRequestService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  getRequestJobsList = async () => {
    return await this.instance
      .post(
        '/list',
        { page: 0 },
        {
          headers: getAuthorizationHeader(),
        },
      )
      .then((res) => {
        return res.data.content;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Approve = async (id: string, file: string) => {
    return await this.instance
      .patch(
        `/${id}/approve`,
        { file },
        {
          headers: getAuthorizationHeader(),
        },
      )
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  Rejected = async (id: string) => {
    return await this.instance
      .patch(`/${id}/reject`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
}
