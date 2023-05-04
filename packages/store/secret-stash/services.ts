import { log } from '@core/logger';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import { giveMeServicesInitialState } from '../utils';
export const useServices = create<ServiceInterface>((set, get) => ({
  offset: 0,
  serviceOpen: false,
  addLoadingService: false,
  editLoadingService: false,
  slugIndex: 0,
  isEditService: false,
  services: {},
  editServices: giveMeServicesInitialState(),
  servicefetching: false,
  errorOnServiceFetching: false,
  getServices: (offset) => {
    return new Promise((resolve, reject) => {
      try {
        set({ servicefetching: true, errorOnServiceFetching: false });
        httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/list`,
          {
            offset: offset,
            limit: 10,
          },
          true,
        )
          .then((response) => {
            if (response?.data?.response?.status === 200) {
              set((state) => {
                return {
                  services: {
                    ...state.services,
                    data:
                      offset > 10
                        ? state?.services?.data?.concat(response?.data?.response?.response?.data)
                        : response?.data?.response?.response?.data,
                  },
                };
              });
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
  fetchMoreData: async () => {
    const { getServices, offset } = get();
    await getServices(offset + 10);
    set({ offset: offset + 10 });
  },
  setHandleServices: (key: string, value: string) => {
    const { editServices } = get();
    const error = editServices?.data?.error;
    error[key] = '';
    set((state) => {
      return {
        editServices: {
          ...state.editServices,
          data: {
            ...state.editServices.data,
            [key]: value,
            error,
          },
        },
      };
    });
  },
  validate: (state: any) => {
    let isValid = true;
    debugger
    const error = state?.data?.error;
    if (state?.data?.name?.length === 0) {
      isValid = false;
      error.name = 'Name required';
    } else {
      error.name = '';
    }
    if (state?.data?.repository_url?.length === 0) {
      isValid = false;
      error.repository_url = 'Repository url required';
    } else {
      error.repository_url = '';
    }
    return { isValid, error };
  },
  addServices: async (e: any) => {
    const { editServices, handleServiceDrawerClose, validate, addLoadingService } = get();
    const { isValid, error } = validate(editServices);
    debugger
    if (!isValid) {
      set((state) => ({ editServices: { ...state.editServices, error } }));
      return false;
    } else {
      set({ addLoadingService: true });
      try {
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
          handleServiceDrawerClose('');
          return response;
        }
      } catch (err: any) {
        log('error', err);
        enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
      } finally {
        set({ addLoadingService: false });
      }
    }
  },

  editServicesfn: async () => {
    const { handleServiceDrawerClose, editServices } = get();
    try {
      set({ editLoadingService: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/update`,
        {
          name: editServices?.data?.name,
          id: editServices?.data?.id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.response, { variant: 'success' });
        // set({ loading: false });
        handleServiceDrawerClose('');
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    } finally {
      set({ editLoadingService: false });
    }
  },

  HandleDeleteServiceAPI: async (i: string) => {
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/remove`,
        {
          id: i?.id,
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
    const { serviceOpen } = get();
    set({ serviceOpen: true });
  },

  handleServiceDrawerClose: () => {
    const { serviceOpen, editServices, isEditService } = get();
    set({ serviceOpen: false, editServices: giveMeServicesInitialState(), isEditService: false });
  },

  onSaveServices: async (key: string) => {
    const { isEditService, editServicesfn, addServices, getServices, offset } = get();
    if (isEditService) {
      await editServicesfn();
      await getServices(offset);
    } else {
      await addServices('');
      await getServices(offset);
    }
  },

  handleServiceClick: async (e: any, i: number) => {
    set({ slugIndex: i });
  },
  // edit services
  onEditServices: (e: any, i: number) => {
    const { isEditService, editServices, handleServiceDrawerOpen } = get();
    set({ isEditService: true });
    handleServiceDrawerOpen('');
    debugger
    // set({ editServices.data: e });
    set((state) => {
      return {
        editServices: {
          ...state?.editServices,
          data: {
            error: state?.editServices?.data?.error,
            ...e,
          },
        },
      };
    });
  },
}));
