import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { localStorageKeys } from '../constants';
import { envConfig } from '@core/envconfig';

interface ConfigOptions {
  headers?: {
    [headerName: string]: string;
  };
  [configName: string]: any;
}

type HttpRequestProps = (
  method: Method,
  url: string,
  data?: any,
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


export const httpRequest: HttpRequestProps = async (method = 'get', url, data = null, includeToken, apiToken, config) => {
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

  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      // ...config,
    });
    return response;
  } catch (error) {
    if (error?.response?.data?.status === 401) {
      console.log('Error:unauthorized', error);
      localStorage.clear();
      window.location.href = 'login'
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } else {
      console.log('Error', error);
    }
  }
};

