import { log } from '@core/logger';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import {
  giveMeKeyState,
  giveMeServicesInitialState,
} from '../utils';
export const useServices = create<ServiceInterface>((set, get) => ({
  serviceOpen: false,
  slugIndex: 0,
  edit: false,
  services: [],
  editServices: giveMeServicesInitialState(),
  servicefetching: false,
  errorOnServiceFetching: false,

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

  handleServiceDrawerOpen: () => {
    set({openService: true})
  },

  handleServiceDrawerClose: () => {
    set({openService: false})
  },

  onSaveServices: async (key: string) => {
    debugger;
    if(edit){
      // await addServices();
      await getServices();
    }else{
      await addServices();
      await getServices();
    }
  },

  handleServiceClick: async (e: any, i: number) => {
    const { makeGetEnvironmentRequest, index, services } = get();
    debugger;
    set({ slugIndex: i });
  },

  // edit services
  onEditServices: (e: any, i: number) => {
    const { isEdit, editServices, handleDrawerOpen } = get();
    set((prevState) => ({ isEdit: { ...prevState.isEdit, services: true } }));

    handleDrawerOpen('services');
    debugger;
    set({ editServices: e });
  },

  clearAll: () => {
    // const { addMessageList, editMessageList } = get();
    set({
      // editEnvironment: giveMeEnvironmentState(),
      editServices: giveMeServicesInitialState(),
      // editKey: giveMeKeyState(),
    });
  },
}));
