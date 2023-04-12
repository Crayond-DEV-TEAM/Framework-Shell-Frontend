import { create } from 'zustand';
import { MessageGroupsDetails } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMestatusGroupState, giveMeStateOfid } from '../utils';

export const useMessageGroupDetails = create<MessageGroupsDetails>((set, get) => ({
  MessagesList: [],
  MessagesListStatus: [],
  addMessageList: giveMestatusGroupState(),
  editMessageList: giveMestatusGroupState(),
  StatusList: giveMestatusGroupState(),
  idList: [],
  SevorityList: [],
  MessageArray: [],
  fetching: false,
  errorOnFetching: false,
  erronOnStatus: false,
  statusLoading: false,
  severityLoading: false,
  errorOnsevority: false,
  deleteLoading: false,
  errorOnDelete: false,
  errorOnAddMesage: false,
  errorOnEditMesage: false,
  errorOnFilterMesage: false,
  addMessageLoading: false,
  editMessageLoading: false,
  filterMessageLoading: false,

  setaddMessage: (payload: { key: string; value: string }) => {
    set((state) => {
      return { addMessageList: { ...state.addMessageList, [payload.key]: payload.value } };
    });
  },
  seteditMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value } }));
  },
  setList: (id: { key: string; value: string }) => {
    set((state) => ({ idList: id.key.id }));
  },

  getMessageList: () => {
    const { idList } = get();

    const payload = { id: idList };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/message_groups/display_all_msg_in_grp`, payload, true)
      .then((response) => {
        console.log(response.data.data.all_msg_by_grp.msg_grp_msgs_infos, '.............');
        set({ MessageArray: response.data });
        const dataTable: any = [];
        const dataTableStatus: any = [];
        // const { Language } = get();
        if (
          Array.isArray(response.data.data.all_msg_by_grp.msg_grp_msgs_infos) &&
          response.data.data.all_msg_by_grp.msg_grp_msgs_infos?.length > 0
        ) {
          response.data.data.all_msg_by_grp.msg_grp_msgs_infos
            ?.filter((x: any) => Boolean(x.is_status))
            .map(({ id }: any) => dataTableStatus.push(id));

          response.data.data.all_msg_by_grp.msg_grp_msgs_infos?.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData?.id ?? i,
                msg_grp_id: tableData?.msg_grp_id ?? '',
                updated_at: tableData?.updated_at ?? '',
                created_at: tableData?.created_at ?? '',
                severity: {
                  label: `${tableData?.severity?.severity_name ?? ''}`,
                  color: '#6F6F6F',
                  bgColor: '#EAEAEA',
                },
                msg_grp_msgs: tableData?.msg_grp_msgs?.length + ' / ' + response.data.data.total_config_language,
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
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
  getStatus: (id: string, is_status: boolean) => {
    const payload = {
      id,
      is_status,
    };
    set({ statusLoading: true, erronOnStatus: false });
    httpRequest('post', `${envConfig.api_url}/messages/is_status`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Status changed Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ erronOnStatus: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ statusLoading: false });
      });
    return false;
  },
  getServerity: () => {
    set({ statusLoading: true, erronOnStatus: false });

    httpRequest('get', `${envConfig.api_url}/messages/display_severity`, {}, true)
      .then((response) => {
        const severtiyCopy: any = [];

        if (Array.isArray(response?.data?.data) && response?.data?.data?.length > 0) {
          response?.data?.data?.map((val: any) => {
            severtiyCopy.push({
              value: val?.id ?? '',
              label: val?.severity_name ?? '',
            });
          });
        }
        set({ SevorityList: severtiyCopy });
        // console.log()
      })
      .catch((err) => {
        set({ erronOnStatus: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ statusLoading: false });
      });
    return false;
  },

  deleteMessage: () => {
    const { idList, MessageArray } = get();
    const { MessagesList } = get();
    const msgId = MessagesList?.filter(({ msg_grp_msgs_Total }: any) => msg_grp_msgs_Total).map(({ id }: any) => id);
    const messageId = msgId.map((id: any) => ({ id }));
    console.log(messageId);

    const payload = {
      msg_grp_msg_info_id: idList,
      msg_grp_msg_data: messageId,
    };
    set({ deleteLoading: true, errorOnDelete: false });
    httpRequest('put', `${envConfig.api_url}/messages/delete_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Deleted message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnDelete: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ deleteLoading: false });
      });
    return false;
  },

  addMessageTable: () => {
    const { addMessageList, idList } = get();
    console.log(addMessageList, 'addMessageList');
    const payload = {
      title: addMessageList.title,
      description: addMessageList.description,
      is_status: addMessageList.is_status,
      severity_id: addMessageList.severity_id,
      msg_grp_id: idList,
      msg_grp_msg_data: [
        {
          configuration_id: '0d376964-991f-4ae4-ad4f-8f88ab57e836',
          message: addMessageList.message,
        },
      ],
    };
    set({ addMessageLoading: true, errorOnAddMesage: false });
    httpRequest('post', `${envConfig.api_url}/messages/add_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Added message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnAddMesage: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ addMessageLoading: false });
      });
    return false;
  },
  //
  editDisplayMessageTable: (id: any) => {
    const payload = { id: id };
    set({ addMessageLoading: true, errorOnAddMesage: false });
    httpRequest('post', `${envConfig.api_url}/messages/display_message_by_id`, payload, true)
      .then((response) => {
        set({ editMessageList: response?.data?.data?.language_info });
      })
      .catch((err) => {
        set({ errorOnAddMesage: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ addMessageLoading: false });
      });
    return false;
  },
  editMessageTable: () => {
    const { editMessageList, idList } = get();

    const payload = {
      title: editMessageList.title,
      description: editMessageList.description,
      is_status: editMessageList.is_status,
      severity_id: 0,
      msg_grp_id: 'string',
      msg_grp_msg_info_id: 'string',
      msg_grp_msg_data: [
        {
          id: 'string',
          configuration_id: 'string',
          message: 'string',
        },
      ],
    };
    set({ editMessageLoading: true, errorOnEditMesage: false });
    httpRequest('put', `${envConfig.api_url}/messages/edit_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Edited message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnEditMesage: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ editMessageLoading: false });
      });
    return false;
  },

  filterMessage: () => {
    const payload = {
      msg_grp_id: '0aa3eba1-9524-431c-a484-74aaeb21aa83',
      is_status: true,
      severity_id: [1],
      created: {
        from_date: 'Mon,10 Apr 2023 04:38:14 GMT',
        end_date: 'Mon,10 Apr 2023 04:38:14 GMT',
      },
      updated: {
        from_date: 'Mon,10 Apr 2023 04:38:14 GMT',
        end_date: 'Mon,10 Apr 2023 04:38:14 GMT3',
      },
    };
    set({ filterMessageLoading: true, errorOnFilterMesage: false });
    httpRequest('post', `${envConfig.api_url}/messages/filter_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Deleted message Successfully !`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFilterMesage: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ filterMessageLoading: false });
      });
    return false;
  },
}));
