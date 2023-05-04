import { log } from '@core/logger';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { EnvironmentInterface } from '../interface';
import { giveMeEnvironmentState } from '../utils';
export const useEnvironment = create<EnvironmentInterface>((set, get) => ({
  environment: [],
  editEnvironment: giveMeEnvironmentState(),
  selectedTab: 0,
  openEnvironment: false,
  isEditEnvironment: false,
  errorOnEnvironmentFetching: false,
  environmentFetching: false,
  getEnvironment: async (slug: string) => {
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
              set((state) => {
                return {
                  environment: {
                    ...state.environment,
                    data: response?.data?.response?.response?.rows,
                  },
                };
              });
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
    if (state?.data?.webhook_url?.length === 0) {
      isValid = false;
      error.webhook_url = 'Webhook url required';
    } else {
      error.webhook_url = '';
    }
    return { isValid, error };
  },

  createEnvironment: async (payload: any, slug: any) => {
    const { handleEnvironmentDrawerClose, editEnvironment, validate } = get();

    const { isValid, error } = validate(editEnvironment);
    debugger
    if (!isValid) {
      set((state) => ({ editEnvironment: { ...state.editEnvironment, error } }));
      return false;
    } else {
      try {
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
          handleEnvironmentDrawerClose('');

          return response;
        }
      } catch (err: any) {
        // set({ loading: false });
        log('error', err);
        enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
      }
    }
  },

  updateEnvironment: async (payload: any) => {
    const { handleEnvironmentDrawerClose } = get();
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/environment/update`,
        {
          name: payload?.name,
          id: payload?.id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response?.data?.response, { variant: 'success' });
        // set({ loading: false });
        handleEnvironmentDrawerClose('');
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  handleChange: (key: string, value: any) => {
    // debugger
    const { editEnvironment } = get();
    // set((prevstate) => ({ editEnvironment: { ...prevstate.editEnvironment, [key]: value } }));
    debugger
    const error = editEnvironment?.data?.error;
    error[key] = '';
    console.log(editEnvironment, 'editEnvironment===');
    set((state) => {
      return {
        editEnvironment: {
          ...state.editEnvironment,
          data: {
            ...state.editEnvironment.data,
            [key]: value,
            error,
          },
        },
      };
    });
  },

  tabOnChange: async (i: any) => {
    set({ selectedTab: i });
  },

  handleEnvironmentDrawerOpen: () => {
    set({ openEnvironment: true });
  },

  handleEnvironmentDrawerClose: () => {
    debugger;
    set({ editEnvironment: giveMeEnvironmentState(), openEnvironment: false, isEditEnvironment: false });
  },

  handleTabEdit: (e: any) => {
    debugger;
    const { isEditEnvironment, editEnvironment, handleEnvironmentDrawerOpen } = get();
    set({ isEditEnvironment: true });
    console.log(editEnvironment, '1234567');
    handleEnvironmentDrawerOpen('');
    set((state) => {
      return {
        editEnvironment: {
          ...state?.editEnvironment,
          data: {
            error: state?.editEnvironment?.data?.error,
            ...e,
          },
        },
      };
    });
  },
  handleDeleteEnv: async (e: object) => {
    debugger
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/remove/environment`,
        {
          id: e?.id,
        },
        true,
      );
      debugger
      if (response.data?.status === 200) {
        enqueueSnackbar(response?.data?.response, { variant: 'success' });
        // set({ loading: false });\
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  onSaveEnvironment: async (environment: any, slug: string) => {
    const { isEditEnvironment, getEnvironment, createEnvironment, updateEnvironment } = get();
    if (isEditEnvironment) {
      await updateEnvironment(environment);
      await getEnvironment(slug);
    } else {
      await createEnvironment(environment, slug);
      const getEnvironmentRes = await getEnvironment(slug);
      return getEnvironmentRes;
    }
  },
}));
