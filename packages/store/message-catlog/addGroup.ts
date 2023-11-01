import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, queryClient, routeTo, ValidateEmail } from '@core/utils';
import { filterContent, localStorageKeys } from '@core/utils/constants';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { useRouting } from '../common';

export interface groupStateProps {
  addMessage: any;
  offset?: number;
  limit?: number;
  messageGroup?: any;
}

export interface MessageGroupProps {
  loading: boolean;
  groupState?: any;
  messageId?: any;
  messageName?: any;
  messageGroup?: any;
  get: (id: string) => void;
  getAllMessageGroup: () => void;
  handleStateChange: (key: any, value: any) => void;
  editMessage: (payload: any, isEdit: boolean) => void;
  clearAddgroupState: () => void;
  addMessageGroup: () => void;
  updateErrorAddGroup: (error: any) => void;
  deleteMessage: (id: string) => void;
  updateStateAddGroup: () => void;
}

export const useAddGroup = create<MessageGroupProps>((set, get) => ({
  groupState: {
    addMessage: {
      group_id: '',
      addTitle: '',
      addDescription: '',
      isAddGroup: false,
      severity_id: '',
      error: {
        addTitle: '',
        addDescription: '',
      },
    },

    offset: 0,
    limit: 50,
  },
  messageGroup: null,
  messageId: '',
  messageName: '',
  loading: false,

  // List Message Group
  getAllMessageGroup: async () => {
    try {
      const { groupState } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['messageGroups'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.message_api_url}/message_groups/display_message_group`,
            {
              offset: groupState?.offset,
              limit: groupState?.limit,
            },
            true,
            undefined, 'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
          );
          return data;
        },
      });
      if (status === 200) {
        set((state) => ({
          loading: false,
          messageGroup: data,
          messageId: data?.[0]?.id,
          messageName: data?.[0]?.title,
        }));
        return data;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // Add Message
  addMessageGroup: async () => {
    try {
      const { groupState } = get();
      const { addMessage, messageId } = groupState;
      set({ loading: true });
      const { data, status, message } = await queryClient.fetchQuery({
        queryKey: ['addMessageGroup'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.message_api_url}/message_catalog/add_message_group`,
            {
              title: addMessage?.addTitle,
              description: addMessage?.addDescription,
              is_status: addMessage?.isAddGroup,
            },
            true,
            undefined,
            'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
          );
          return data;
        },
      });
      if (status === 200) {
        enqueueSnackbar('New Message Group successfully Added!!!!', { variant: 'success', autoHideDuration: null });
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Can&apos;t create message group with same name', { variant: 'error', autoHideDuration: null });
    }
  },

  // Edit Message
  editMessage: async (payload, isEdit) => {
    debugger
    try {
      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.message_api_url}/message_catalog/edit_message_group`,
        {
          id: payload?.group_id,
          title: payload?.addTitle,
          description: payload?.addDescription,
          is_status: payload?.isAddGroup,
        },
        true,
        undefined,
        'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Edit Successfully!!', { variant: 'success' });
        set({ loading: false });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  // Delete Message
  deleteMessage: async (id) => {
    try {
      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.message_api_url}/message_catalog/delete_message_group`,
        {
          id: id,
        },
        true,
        undefined,
        'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
      );

      if (response.data?.status === 200) {
        set((state) => ({
          messageId: '',
          messageName: '',
        }));
        enqueueSnackbar('Deleted message Group Successfully!!', { variant: 'success' });
        return response;
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  //Get All Message Group By ID
  get: async (id) => {
    try {
      const { groupState } = get();
      const { addMessage } = groupState;
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['get'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.message_api_url}/message_catalog/display_all_message_from_grp_by_id`,
            {
              id: id,
            },
            true,
            undefined,
            'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
          );
          return data;
        },
      });
      if (status === 200) {
        set((state) => ({
          groupState: {
            ...groupState,
            addMessage: {
              ...addMessage,
              group_id: data?.id,
              addTitle: data?.title ?? '',
              addDescription: data?.description ?? '',
              isAddGroup: data?.is_status ?? '',
            },
          },
        }));
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  //clear state
  clearAddgroupState: () => {
    const { groupState } = get();
    const { addMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        addMessage: {
          ...addMessage,
          group_id: '',
          addTitle: '',
          addDescription: '',
          isAddGroup: false,
          severity_id: '',
          error: {
            addTitle: '',
            addDescription: '',
          },
        },
      },
    });
  },

  //state change
  handleStateChange: (key: any, value: any) => {
    const { groupState } = get();
    const { addMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        addMessage: {
          ...addMessage,
          [key]: value,
        },
      },
    });
  },

  updateErrorAddGroup: (error: any) => {
    const { groupState } = get();
    const { addMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        addMessage: {
          ...addMessage,
          error: {
            ...addMessage.error,
            error,
          },
        },
      },
    });
  },

  updateStateAddGroup: () => {
    const { groupState } = get();
    const { addMessage } = groupState;
    set((state) => ({
      groupState: {
        ...state?.groupState,
        addessage: {
          ...addMessage,
          addTitle: '',
          addDescription: '',
        },
      },
      loading: false,
    }));
  },
}));
