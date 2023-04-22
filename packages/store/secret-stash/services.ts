import { envConfig } from '@core/envconfig';
import { httpRequest, secret_stash_localstorageKeys } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import { dummyServicesData, giveMeEnvironmentState, giveMeKeyState, giveMeServicesInitialState, tabs } from '../utils';
import { log } from '@core/logger';

export const useServices = create<ServiceInterface>((set, get) => ({
  services: [],
  environment: [],
  editEnvironment: giveMeEnvironmentState(),
  editKey: giveMeKeyState(),
  editServices: giveMeServicesInitialState(),
  keys: [],
  fetching: false,
  errorOnFetching: false,

  getServices: () => {
    return new Promise((resolve, reject) => {
      try {
        const { editServices } = get();
        httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/list`,
          {
            offset: 0,
            limit: 10,
          },
          true,
        )
          .then((response) => {
            if (response?.data?.response?.status === 200) {
              set({ services: response?.data?.response?.response?.data });

              enqueueSnackbar('datalisted', { variant: 'success' });

              // return response?.data?.response?.response?.data;
              resolve(response?.data?.response?.response?.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err: any) {
        log('error', err);
        const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
        enqueueSnackbar('errror', { variant: 'error' });
        reject(new Error('Internal Server Error'));
      }
    });
  },

  getEnvironment: async (slug: string) => {
    // debugger;
    return new Promise((resolve, reject) => {
      try {
        const { editEnvironment } = get();
        httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/environments/list`,
          {
            slug: slug ?? '',
            offset: 0,
            limit: 10,
          },
          true,
        )
          .then((response) => {
            if (response?.data?.response?.status === 200) {
              set({ environment: response?.data?.response?.response?.rows });

              enqueueSnackbar('tabs listed', { variant: 'success' });

              resolve(response?.data?.response?.response?.rows);
            } else {
              throw new Error('Internal Server Error');
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err: any) {
        log('error', err);
        const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
        enqueueSnackbar('tab errror', { variant: 'error' });
      }
    });
  },

  getKeys: async (environment: string, slug: string) => {
    return new Promise((resolve, reject) => {
      try {
        const { editEnvironment } = get();
        debugger;
        httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/my/keys`,
          {
            environment: environment ?? '',
            slug: slug ?? '',
            offset: 0,
            limit: 10,
          },
          true,
        )
          .then((response) => {
            console.log(response);
            if (response?.data?.status === 200) {
              // debugger
              // console.log(response?.data?.response?.rows, '');

              set({ keys: response?.data?.response?.rows });

              enqueueSnackbar('keys listed', { variant: 'success' });
              resolve(response?.data);
            } else {
              throw new Error('Internal Server Error');
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err: any) {
        log('error', err);
        const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
        enqueueSnackbar('keys errror', { variant: 'error' });
      }
    });
  },

  addEnvironment: async (payload: any, slug: any) => {
    const { editKey } = get();
    try {
      // set({ loading: true });
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/add/environment`,
        {
          environment: editKey?.key,
          slug: slug,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('added Successfully!!', { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  setHandleChangefn: (key, value) => {
    // debugger;
    set((prevstate) => ({ editServices: { ...prevstate.editServices, [key]: value } }));
  },

  handleChange: (key, value) => {
    // debugger;
    set((prevstate) => ({ editEnvironment: { ...prevstate.editEnvironment, [key]: value } }));
  },

  handleKeyChange: (key, value) => {
    // debugger;
    set((prevstate) => ({ editKey: { ...prevstate.editKey, [key]: value } }));
  },

  handleEdit: (e) => {
    debugger;
    set({ environment: [e] });
  },
}));
function reject(error: any) {
  throw new Error('Function not implemented.');
}
function resolve(rows: any) {
  throw new Error('Function not implemented.');
}
