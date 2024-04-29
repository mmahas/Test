/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Cookies from 'js-cookie';

export function getAuthorizationHeader() {
  const token = Cookies.get('token');

  return {
    Authorization: `Bearer ${token ?? ''}`,
  };
}
