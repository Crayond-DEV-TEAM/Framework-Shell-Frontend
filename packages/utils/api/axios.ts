import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { localStorageKeys } from '../constants';
import { envConfig } from '@core/envconfig';

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
    apiToken?: string,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>,
    slug?: string,
  ): Promise<AxiosResponse<any, any>>;
}

export const httpRequest: HttpRequestProps = (
  method = 'get',
  url,
  data = null,
  includeToken,
  apiToken,
  config,
  slug = '46f5e3e2-0672-4fdc-8fd2-388856c0fd9e',
) => {
  const headers = {
    ...(includeToken &&
      envConfig.client_environment !== 'external' && {
        Authorization: `Bearer ${localStorage.getItem(localStorageKeys.authToken)}`,
      }),
    ...(Boolean(apiToken) && {
      'x-api-token': apiToken,
    }),
    ...(config?.headers ?? {}),
    ...{ slug },
  };

  console.log('THis is STEP 2:', headers);

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
