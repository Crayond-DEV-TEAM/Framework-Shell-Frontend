import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { AddEditMessageState, MessageStoreInterface } from '../interface';
import { giveMeAddEditMessageInitialState } from '../utils';
import { useMessageGroupDetails } from './messageDetails';
import { useSlug } from '../common';

export const useMessage = create<MessageStoreInterface>((set, get) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  MessagesList: [],
  MessagesListStatus: [],
  MessageArray: [],
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
    const { addEditMessageState } = get()
    const error = addEditMessageState?.error
    error[key] = ''
    set((state) => ({
      addEditMessageState: {
        ...state.addEditMessageState, [key]: value, error
      }
    }));
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
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    set({ editDataLoading: true, errorOnEditData: false });
    httpRequest('post', `${envConfig.api_url}/message_catalog/display_message_by_id`, { id }, true, undefined, {
      headers: { slug: slugId },
    })
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

  validateCallBack: (isValid, error) => {
    const { addEditMessageState } = get()
    set((state) => ({
      addEditMessageState: {
        ...state.addEditMessageState, error
      }
    }));
    console.log(addEditMessageState);
    return isValid;
  },

  addMessage: (group_id: string) => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const { addEditMessageState, clearAll, getAllMessages } = get();
    const payload = {
      title: addEditMessageState.title,
      description: addEditMessageState.description,
      is_status: addEditMessageState.status,
      severity_id: addEditMessageState.severity,
      msg_grp_id: group_id,
      msg_grp_msg_data: Object.values(addEditMessageState?.messages ?? {}),
    };

    set({ adding: true, errorOnAdding: false });

    httpRequest('post', `${envConfig.api_url}/message_catalog/add_message`, payload, true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        set({ addEditMessageState: giveMeAddEditMessageInitialState(), open: false });
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnAdding: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ adding: false });
        getAllMessages(group_id);
        clearAll();
      });

  },

  editMessage: (group_id: string) => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const { addEditMessageState, clearAll, getAllMessages } = get();
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
    httpRequest('put', `${envConfig.api_url}/message_catalog/edit_message`, payload, true, undefined, {
      headers: { slug: slugId },
    })
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
        getAllMessages(group_id);
        clearAll();
      });
  },

  deleteMessage: (deleteId: string, groupId: string) => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const { getAllMessages } = get();
    const payload = {
      msg_grp_msg_info_id: deleteId,
    };
    set({ deleting: true, errorOnDeleting: false });
    httpRequest('put', `${envConfig.api_url}/message_catalog/delete_message`, payload, true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar(`Deleted message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnDeleting: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ deleting: false });
        getAllMessages(groupId);
      });
  },

  getAllMessages: (group_id: string) => {
    const slugId = useSlug.getState().slugs['MESSAGE-CATALOG'];

    const payload = { id: group_id };
    const { MessagesList } = get();
    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/message_catalog/display_all_msg_in_grp`, payload, true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        set({ MessageArray: response.data });
        const dataTable: any = [];
        const dataTableStatus: any = [];
        // const { Language } = get();
        if (Array.isArray(response.data.data)) {
          response.data.data?.filter((x: any) => Boolean(x.is_status)).map(({ id }: any) => dataTableStatus.push(id));
          response.data.data?.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData?.ref_id ?? '',
                msg_grp_id: tableData?.msg_grp_id ?? '',
                updated_at: tableData?.updated_at ?? '',
                created_at: tableData?.created_at ?? '',
                severity: [
                  {
                    label: `${tableData?.severity?.severity_name ?? ''}`,
                    color: '#6F6F6F',
                    bgColor: '#EAEAEA',
                  },
                ],
                msg_grp_msgs: tableData?.configured_language,
                msg_grp_msgs_Total: tableData?.msg_grp_msgs,
                status: tableData?.is_status ?? '',
                title: tableData?.title ?? '',
                description: tableData?.description ?? '',
              }),
            set({ MessagesList: dataTable }),
            set({ MessagesListStatus: dataTableStatus }),
          );
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        // enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
  clearAll: () => {
    set({
      addEditMessageState: giveMeAddEditMessageInitialState(),
      messages: [],
    });
  },
  clearAllMessage: () => {
    set({
      MessagesList: [],
    });
  },
}));
