import { create } from 'zustand';
import { MessageConfigInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMeMessageGroupInitialState } from '../utils';
import { useSlug } from '../common';

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
    debugger
    const { addMessage } = get()
    const error = addMessage?.error
    error[payload.key] = ''
    console.log(addMessage, 'addMessage');

    set((state) => ({ addMessage: { ...state.addMessage, [payload.key]: payload.value, error } }));
  },

  seteditMessage: (payload: { key: string; value: string }) => {
    debugger
    const { editMessageList } = get()
    const error = editMessageList?.error
    error[payload.key] = ''
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value, error } }));
    console.log(editMessageList, 'addMessage');

  },
  setselctedMessage: (payload: { key: any; value: string }) => {
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value } }));
  },

  getMessageGroups: () => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.api_url}/message_catalog/display_message_group`,
      {
        offset: 0,
        limit: 50,
      },
      true,
      undefined,
      {
        headers: { slug: slugId },
      }
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

  validateCallBack: (isValid, error) => {
    const { addMessage } = get()
    set((state) => ({
      addMessage: {
        ...state.addMessage, error
      }
    }));
    return isValid;
  },


  addMessageGroups: () => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    set({ addMessageLoading: true, deleteMessageError: false });
    const { addMessage, getMessageGroups } = get();
    const payload = {
      title: addMessage.title,
      description: addMessage.description,
      is_status: addMessage.is_status,
    };

    httpRequest('post', `${envConfig.api_url}/message_catalog/add_message_group`, payload, true, undefined, {
      headers: { slug: slugId },
    })
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
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const { editMessage, editMessageList, getMessageGroups } = get();
    const payload = {
      id: editMessageList?.id,
      title: editMessageList.title,
      description: editMessageList.description,
      is_status: editMessageList.is_status,
    };

    set({ editMessageLoading: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/message_catalog/edit_message_group`, payload, true, undefined, {
      headers: { slug: slugId },
    })
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
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];
    debugger
    const { editMessageList } = get();

    set({ editMessageLoading: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/message_catalog/display_all_message_from_grp_by_id `, payload, true, undefined,
      {
        headers: { slug: slugId },
      })
      .then((response) => {
        set((state) => ({
          ...state,
          editMessageList: {
            ...state.editMessageList,
            ...response.data.data
          }
        }));
      })      
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
      console.log(editMessageList, '123');
    return false;
  },
  deleteMessageGroups: (payload: any) => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const { deleteMessage, getMessageGroups } = get();

    set({ deleteMessageLoading: true, deleteMessageError: false });
    httpRequest('put', `${envConfig.api_url}/message_catalog/delete_message_group`, payload, true,
      undefined,
      {
        headers: { slug: slugId },
      })
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
