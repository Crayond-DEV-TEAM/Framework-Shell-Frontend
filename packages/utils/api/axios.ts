import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { localStorageKeys } from '../constants';
import { envConfig } from '@core/envconfig';

interface ConfigOptions {
  headers?: {
    [headerName: string]: string;
  };
  [configName: string]: any;
}

type HttpRequestProps = (
  method: AxiosRequestConfig['method'],
  url: AxiosRequestConfig['url'],
  data?: AxiosRequestConfig['data'],
  includeToken?: boolean,
  apiToken?: string,
  config?: ConfigOptions,
) => Promise<AxiosResponse<any, any>>;

/**
 * method The HTTP method (e.g. GET, POST).
 * The URL to send the request to.
 * The data to send with the request (optional).
 * Additional configuration options (optional).
 
 * A promise that resolves with the response data or rejects with an error.
 */

export const httpRequest: HttpRequestProps = (method = 'get', url, data = null, includeToken, apiToken, config) => {
  const headers = {
    ...(includeToken &&
      envConfig.client_environment !== 'external' && {
        Authorization: `Bearer ${localStorage.getItem(localStorageKeys.authToken)}`,
      }),
    ...(Boolean(apiToken) && {
      'x-api-token': apiToken,
    }),
    ...(config?.headers ?? {}),
  };

  return axios({
    method,
    url,
    data,
    headers,
    // ...config,
  });
};
