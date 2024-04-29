// import getConfig from 'next/config';
import axios from 'axios';

export const axiosWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: any) {
  const requestOptions = {
    method: 'GET',
    // headers: authHeader(url)
  };
  return await axios(url, requestOptions);
}

async function post(url: any, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return await axios(url, requestOptions);
}

async function put(url: any, body: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return await axios(url, requestOptions);
}

async function _delete(url: any) {
  const requestOptions = {
    method: 'DELETE',
    // headers: authHeader(url)
  };
  return await axios(url, requestOptions);
}
