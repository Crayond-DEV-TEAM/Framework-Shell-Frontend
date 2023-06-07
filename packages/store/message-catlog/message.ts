import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { AddEditMessageState, MessageStoreInterface } from '../interface';
import { giveMeAddEditMessageInitialState } from '../utils';
import { useMessageGroupDetails } from './messageDetails';

export const useMessage = create<MessageStoreInterface>((set, get) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),

  messages: [],
  addEditMessageState: giveMeAddEditMessageInitialState(),

  fetching: false,
  errorOnFetching: false,

  adding: false,
  errorOnAdding: false,

  editing: false,
  errorOnEditing: false,

  deleting: false,
  errorOnDeleting: false,

  editDataLoading: false,
  errorOnEditData: false,

  handleAddEditStateChange: (key: string, value: string | number | boolean) => {
    debugger;
    set((state) => ({ addEditMessageState: { ...state.addEditMessageState, [key]: value } }));
  },

  handleAddEditMessageChange: (configuration_id: string, message: string) => {
    set((state) => ({
      addEditMessageState: {
        ...state.addEditMessageState,
        messages: {
          ...(state.addEditMessageState?.messages ?? {}),
          [configuration_id]: {
            ...(state.addEditMessageState.messages?.[configuration_id] ?? {}),
            configuration_id,
            message,
          },
        },
      },
    }));
  },

  onEditClicked: (id: string) => {
    set({ editDataLoading: true, errorOnEditData: false });
    httpRequest('post', `${envConfig.api_url}/messages/display_message_by_id`, { id }, true)
      .then((response) => {
        const data = response?.data?.data?.language_info ?? {};
        const messages: { [key: string]: { configuration_id: string; language_id?: number; message: string } } = {};
        response?.data?.data?.message_details?.forEach((_: any) => {
          messages[_.configuration_id] = { ..._ };
        });
        set({
          addEditMessageState: {
            ...response?.data?.data?.language_info,
            status: data.is_status,
            severity: data.severity.id,
            messages,
          },
        });
      })
      .catch((err) => {
        set({ errorOnEditData: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ editDataLoading: false });
      });
  },

  addMessage: (group_id: string) => {
    const { addEditMessageState, clearAll, getAllMessages } = get();
    const { getMessageList } = useMessageGroupDetails();
    debugger;
    const payload = {
      title: addEditMessageState.title,
      description: addEditMessageState.description,
      is_status: addEditMessageState.status,
      severity_id: addEditMessageState.severity,
      msg_grp_id: group_id,
      msg_grp_msg_data: Object.values(addEditMessageState?.messages ?? {}),
    };

    set({ adding: true, errorOnAdding: false });
    httpRequest('post', `${envConfig.api_url}/messages/add_message`, payload, true)
      .then((response) => {
        set({ addEditMessageState: giveMeAddEditMessageInitialState(), open: false });
        enqueueSnackbar(`Added message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnAdding: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ adding: false });
        getMessageList(group_id);
        clearAll();
      });
  },

  editMessage: (group_id: string) => {
    const { addEditMessageState, clearAll, getAllMessages } = get();
    const { getMessageList } = useMessageGroupDetails();

    const payload = {
      title: addEditMessageState.title,
      description: addEditMessageState.description,
      is_status: addEditMessageState.status,
      severity_id: addEditMessageState.severity,
      msg_grp_id: group_id,
      msg_grp_msg_info_id: addEditMessageState.id,
      msg_grp_msg_data: Object.values(addEditMessageState?.messages ?? {}),
    };

    set({ editing: true, errorOnEditing: false });
    httpRequest('put', `${envConfig.api_url}/messages/edit_message`, payload, true)
      .then((response) => {
        set({ addEditMessageState: giveMeAddEditMessageInitialState(), open: false });
        enqueueSnackbar(`Message Updated Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnEditing: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ editing: false });
        getMessageList(group_id);
        clearAll();
      });
  },

  deleteMessage: (deleteId: string, groupId: string) => {
    const payload = {
      msg_grp_msg_info_id: groupId,
      msg_grp_msg_data: [{ id: deleteId }],
    };
    set({ deleting: true, errorOnDeleting: false });
    httpRequest('put', `${envConfig.api_url}/messages/delete_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Deleted message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnDeleting: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ deleting: false });
        // const { getMessageList } = useMessageGroupDetails();
        // getMessageList(groupId);
      });
  },

  getAllMessages: (id: string) => {
    const payload = { id };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/message_groups/display_all_msg_in_grp`, payload, true)
      .then((response) => {
        set({ messages: response.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  clearAll: () => {
    debugger;
    set({
      addEditMessageState: giveMeAddEditMessageInitialState(),
      messages: [],
    });
  },
}));
