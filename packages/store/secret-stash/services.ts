import { log } from '@core/logger';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import { giveMeEnvironmentState, giveMeKeyState, giveMeServicesInitialState } from '../utils';
export const useServices = create<ServiceInterface>((set, get) => ({
  services: [],
  environment: [],
  editEnvironment: giveMeEnvironmentState(),
  editKey: giveMeKeyState(),
  editServices: giveMeServicesInitialState(),
  keys: [],
  servicefetching: false,
  errorOnServiceFetching: false,
  environmentFetching: false,
  errorOnEnvironmentFetching: false,

  getServices: () => {
    return new Promise((resolve, reject) => {
      try {
        set({ servicefetching: true, errorOnServiceFetching: false });
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
          })
          .finally(() => {
            set({ servicefetching: false });
          });
      } catch (err: any) {
        log('error', err);
        enqueueSnackbar('errror', { variant: 'error' });
        reject(new Error('Internal Server Error'));
      }
    });
  },

  getEnvironment: async (slug: string) => {
    // debugger;
    return new Promise((resolve, reject) => {
      try {
        set({ environmentFetching: true, errorOnEnvironmentFetching: false });
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
          })
          .finally(() => {
            set({ environmentFetching: false });
          });
      } catch (err: any) {
        log('error', err);
        enqueueSnackbar('tab errror', { variant: 'error' });
      }
    });
  },

  getKeys: async (environment: string, slug: string) => {
    return new Promise((resolve, reject) => {
      try {
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

  createEnvironment: async (payload: any, slug: any) => {
    // const { editKey } = get();
    try {
      debugger;
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/add/environment`,
        {
          environment: payload?.name,
          slug: slug,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  setHandleServices: (key, value) => {
    debugger;
    const { editServices } = get();
    const { data } = editServices;

    set((state) => {
      return {
        editServices: {
          ...state.editServices,
          data: {
            ...state.editServices.data,
            [key]: value,
          },
        },
      };
    });
  },

  handleChange: (key, value) => {
    debugger;
    set((prevstate) => ({ editEnvironment: { ...prevstate.editEnvironment, [key]: value } }));
  },

  handleKeyChange: (key, value) => {
    // debugger;
    set((prevstate) => ({ editKey: { ...prevstate.editKey, [key]: value } }));
  },

  handleEditServicesState: (e) => {
    debugger;
    set({ editServices: e });
  },

  handleEditKeysState: (e) => {
    debugger;
    set({ editKey: e });
  },

  addServices: async (e: any) => {
    const { editServices } = get();
    try {
      // set({ loading: true });
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/create`,
        {
          name: editServices?.data?.name,
          project_id: 'd49a455b-a608-4d32-9912-f45251b31d56',
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.response, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  addKeys: async (e: any, slug: string, environment: string) => {
    const { editKey } = get();
    try {
      // set({ loading: true });
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/add/key`,
        {
          environment: environment,
          slug: slug,
          name: e?.name,
          value: e?.value,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  editKeysAPI: async (e: any, slug: string, environment: string) => {
    try {
      // set({ loading: true });
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/update/key`,
        {
          slug: slug,
          name: e?.name,
          value: e?.value,
          id: e?.id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  clearAll: () => {
    // const { addMessageList, editMessageList } = get();
    set({
      editEnvironment: giveMeEnvironmentState(),
      editServices: giveMeServicesInitialState(),
      editKey: giveMeKeyState(),
    });
  },
}));

function reject(error: any) {
  throw new Error('Function not implemented.');
}
function resolve(rows: any) {
  throw new Error('Function not implemented.');
}
