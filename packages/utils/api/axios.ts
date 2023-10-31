import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { localStorageKeys } from '../constants';

/**
 * method The HTTP method (e.g. GET, POST).
 * The URL to send the request to.
 * The data to send with the request (optional).
 * Additional configuration options (optional).
 
 * A promise that resolves with the response data or rejects with an error.
 */

interface HttpRequestProps {
  (
    method: AxiosRequestConfig['method'],
    url: AxiosRequestConfig['url'],
    data?: AxiosRequestConfig['data'],
    includeToken?: boolean,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>,
  ): Promise<AxiosResponse<any, any>>;
}

export const httpRequest: HttpRequestProps = (method = 'get', url, data = null, includeToken, config) => {
  const headers = {
    ...(includeToken && {
      Authorization:
        // `Bearer ${localStorage.getItem(localStorageKeys.authToken)}`
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMTU2ZWNmLWFiNTgtNGY0Zi1iYjljLWJjYTk0YzhmM2U3OCIsInByb2ZpbGVJZCI6IjI3YWQ2NTJmLTkxNDMtNGM1NC1hNWNkLTg1YmNkNDcwYjk2NyIsImlhdCI6MTY5ODY0NDE2NX0.B8dDou74V9Ey8HIi0SUJre3ehWAHcWI3z_2434S1HII',
    }),
    ...(config?.headers ?? {}),
  };

  return axios({
    method,
    url,
    data,
    headers,
    ...config,
  });
};

// Make a GET request to the /users endpoint with headers
// httpRequest('GET', '/users', null, { headers: { 'X-My-Header': 'My Value' } })
//   .then((data) => {
//     // Handle the response data
//   })
//   .catch((error) => {
//     // Handle the error
//   });
