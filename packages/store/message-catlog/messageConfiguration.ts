import { create } from 'zustand';
import { MessageConfigInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMeMessageGroupInitialState } from '../utils';

export const useMessageConfiguration = create<MessageConfigInterface>((set, get) => ({
  messageGroup: [],
  fetching: false,
  errorOnFetching: false,

  editMessage: giveMeMessageGroupInitialState(),
  editMessageLoading: false,
  editMessageError: false,

  addMessage: giveMeMessageGroupInitialState(),
  addMessageLoading: false,
  addMessageError: false,

  editMessageList: giveMeMessageGroupInitialState(),
  deleteMessage: [],
  deleteMessageLoading: false,
  deleteMessageError: false,

  setaddMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ addMessage: { ...state.addMessage, [payload.key]: payload.value } }));
  },

  seteditMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value } }));
  },
  setselctedMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value } }));
  },

  getMessageGroups: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.message_api_url}/message_groups/display_message_group`,
      {
        offset: 0,
        limit: 50,
      },
      true,
    )
      .then((response) => {
        set({ messageGroup: response.data.data?.sort((a: any, b: any) => b.label - a.label) });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  addMessageGroups: () => {
    set({ addMessageLoading: true, deleteMessageError: false });
    const { addMessage, getMessageGroups } = get();
    const payload = {
      title: addMessage.title,
      description: addMessage.description,
      is_status: addMessage.is_status,
    };

    httpRequest('post', `${envConfig.message_api_url}/message_groups/add_message_group`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Message Group successfully Added!', { variant: 'success' });
        get().getMessageGroups();
      })
      .catch((err) => {
        set({ addMessageError: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ addMessageLoading: false });
        getMessageGroups();
      });
    return false;
  },
  editMessageGroups: () => {
    const { editMessage, editMessageList, getMessageGroups } = get();
    const payload = {
      id: editMessageList.id,
      title: editMessageList.title,
      description: editMessageList.description,
      is_status: editMessageList.is_status,
    };

    set({ editMessageLoading: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.message_api_url}/message_groups/edit_message_group`, payload, true)
      .then((response) => {
        enqueueSnackbar('Edit Successfully!!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getMessageGroups();
      });
    return false;
  },
  // editMessageListGroups
  editMessageListGroups: (payload: any) => {
    const { editMessageList } = get();

    set({ editMessageLoading: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.message_api_url}/message_groups/display_all_message_from_grp_by_id `, payload, true)
      .then((response) => {
        set({ editMessageList: response.data.data.message_group_data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
  deleteMessageGroups: (payload: any) => {
    const { deleteMessage, getMessageGroups } = get();

    set({ deleteMessageLoading: true, deleteMessageError: false });
    httpRequest('put', `${envConfig.message_api_url}/message_groups/delete_message_group`, payload, true)
      .then((response) => {
        enqueueSnackbar('Deleted message Group Successfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ deleteMessageError: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ deleteMessageLoading: false });
        getMessageGroups();
      });
    return false;
  },
  clearAll: () => {
    set({
      addMessage: giveMeMessageGroupInitialState(),
      editMessage: giveMeMessageGroupInitialState(),
    });
  },
}));
