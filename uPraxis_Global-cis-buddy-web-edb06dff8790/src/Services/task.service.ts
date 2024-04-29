import axios, { AxiosInstance } from 'axios';
import { getAuthorizationHeader } from './../utils/getAuthorizationHeader';

export class TaskService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  getTaskList = async () => {
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
}
