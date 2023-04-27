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

  getEnvironment: async (slug: string) => {
    // return new Promise((resolve, reject) => {
    const { environmentFetching, errorOnEnvironmentFetching } = get();
    try {
      set({ environmentFetching: true, errorOnEnvironmentFetching: false });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/environments/list`,
        {
          slug: slug ?? null,
          offset: 0,
          limit: 10,
        },
        true,
      )
      debugger;
      if (response?.data?.response?.status === 200) {
        set({ environment: response?.data?.response?.response?.rows });

        // enqueueSnackbar('tabs listed', { variant: 'success' });

        return (response?.data?.response?.response?.rows);
      }
    } catch (err: any) {
      log('error', err);
      enqueueSnackbar('tab errror', { variant: 'error' });
    }
  },

  createEnvironment: async (payload: any, slug: any) => {
    const { handleEnvironmentDrawerClose } = get();
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
        handleEnvironmentDrawerClose('');

        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding!', { variant: 'error' });
    }
  },

  updateEnvironment: async (payload: any) => {
    const { handleEnvironmentDrawerClose } = get();
    try {
      debugger;
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
  },

  handleChange: (key: string, value: any) => {
    debugger;
    set((prevstate) => ({ editEnvironment: { ...prevstate.editEnvironment, [key]: value } }));
  },

  tabOnChange: async (i: any) => {
    const { index } = get();
    debugger;
    set({ selectedTab: i });
  },

  handleEnvironmentDrawerOpen: () => {
    set({ openEnvironment: true });
  },

  handleEnvironmentDrawerClose: () => {
    debugger;
    const { editEnvironment, isEditEnvironment, openEnvironment } = get();
    set({ editEnvironment: giveMeEnvironmentState(), openEnvironment: false, isEditEnvironment: false });
  },

  handleTabEdit: (e: any) => {
    debugger;
    const { isEditEnvironment, handleEnvironmentDrawerOpen } = get();
    set({ isEditEnvironment: true });
    handleEnvironmentDrawerOpen();
    set({ editEnvironment: e });
  },

  onSaveEnvironment: async (environment: any, slug: string) => {
    debugger;
    const { isEditEnvironment, getEnvironment, createEnvironment, updateEnvironment } = get();
    if (isEditEnvironment) {
      await updateEnvironment(environment);
      await getEnvironment(environment?.slug);
    } else {
      await createEnvironment(environment, slug);
      await getEnvironment(environment?.slug);
    }
  },
}));
