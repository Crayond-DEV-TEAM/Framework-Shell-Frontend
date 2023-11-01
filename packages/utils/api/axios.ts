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
    Slug?: string,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>,
  ): Promise<AxiosResponse<any, any>>;
}

export const httpRequest: HttpRequestProps = (
  method = 'get',
  url,
  data = null,
  includeToken,
  apiToken,
  slug,
  config,
) => {

  const headers = {
    ...(includeToken &&
      envConfig.client_environment !== 'external' && {
        Authorization: `Bearer ${localStorage.getItem(localStorageKeys.authToken)}`,
      }),
    ...(Boolean(apiToken) && {
      'x-api-token': apiToken,
    }),
    // ...(slugId && { 'slug': slugId }),
    ...{slug},
    ...(config?.headers ?? {}),
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
