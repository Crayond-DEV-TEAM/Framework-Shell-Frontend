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
  group: null,
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
  FilterList: [],
  filterLoading: false,
  errorOnFilter: false,
  filterContentState: [],

  setaddMessage: (payload: { key: string; value: string }) => {
    set((state) => {
      return { addMessageList: { ...state.addMessageList, [payload.key]: payload.value } };
    });
  },
  seteditMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ editMessageList: { ...state.editMessageList, [payload.key]: payload.value } }));
  },
  setList: (id: { key: string; value: string }) => {
    set((state) => ({ group: id.key.id }));
  },
  setfilter: (payload: { key: string; value: string }) => {
    set((state) => ({ filterContentState: { ...state.filterContentState, [payload.key]: payload.value } }));
  },

  getMessageList: () => {
    const { group } = get();

    const payload = { id: group };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/message_groups/display_all_msg_in_grp`, payload, true)
      .then((response) => {
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
        // enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
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
    const { group } = get();
    const { MessagesList } = get();
    const msgId = MessagesList?.filter(({ msg_grp_msgs_Total }: any) => msg_grp_msgs_Total).map(({ id }: any) => id);
    const messageId = msgId.map((id: any) => ({ id }));
    console.log(messageId);

    const payload = {
      msg_grp_msg_info_id: group,
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
    const { addMessageList, group } = get();
    console.log(addMessageList, 'addMessageList');
    const payload = {
      title: addMessageList.title,
      description: addMessageList.description,
      is_status: addMessageList.is_status,
      severity_id: addMessageList.severity_id,
      msg_grp_id: group,
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
    const { editMessageList, group } = get();
    const payload = {
      title: editMessageList.title,
      description: editMessageList.description,
      is_status: editMessageList.is_status,
      severity_id: 0,
      msg_grp_id: group,
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

  filterMessage: (serverityFilter: string | number, createdOn: any, updateOn: any) => {
    const { group } = get();

    const payload = {
      msg_grp_id: group,
      is_status: true,
      severity_id: serverityFilter ?? [],
      created: createdOn ?? {
        from_date: '',
        end_date: '',
      },
      updated: updateOn ?? {
        from_date: '',
        end_date: '',
      },
    };
    set({ filterMessageLoading: true, errorOnFilterMesage: false });
    httpRequest('post', `${envConfig.api_url}/messages/filter_message`, payload, true)
      .then((response) => {
        enqueueSnackbar(`Filtered Successfully !`, { variant: 'success' });
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

  onApply: () => {
    // const { filterContent, filterMessage } = get();
    // const FilterArray: any = [];
    // if (Array.isArray(filterContent?.[0]?.children) && filterContent?.[0]?.children?.length > 0) {
    //   filterContent?.[0]?.children?.filter((val: any) => val?.value === true && FilterArray.push(val?.id));
    // }
    // let created = {
    //   from_date: '',
    //   end_date: '',
    // };
    // let updated = {
    //   from_date: '',
    //   end_date: '',
    // };
    // if (Array.isArray(filterContent?.[2]?.children) && filterContent?.[2]?.children?.length > 0) {
    //   if (
    //     filterContent?.[2]?.children?.filter((val: any) => val?.label === 'Created On' && val?.value === true)?.length >
    //     0
    //   ) {
    //     created = {
    //       from_date: filterContent?.[2]?.children?.[2]?.value ?? '',
    //       end_date: filterContent?.[2]?.children?.[3]?.value ?? '',
    //     };
    //   }
    //   if (
    //     filterContent?.[2]?.children?.filter((val: any) => val?.label === 'Modified On' && val?.value === true)
    //       ?.length > 0
    //   ) {
    //     updated = {
    //       from_date: filterContent?.[2]?.children?.[2]?.value ?? '',
    //       end_date: filterContent?.[2]?.children?.[3]?.value ?? '',
    //     };
    //   }
    // }
    // filterMessage(FilterArray, created, updated);
    // clearfilter();
  },

  clearAll: () => {
    // const { addMessageList, editMessageList } = get();
    set({
      addMessageList: giveMestatusGroupState(),
      editMessageList: giveMestatusGroupState(),
    });
  },

  clearfilter: () => {
    set({
      // filterContent: [
      //   {
      //     name: 'Severity',
      //     children: [
      //       {
      //         component: 'checkbox',
      //         label: 'High',
      //         id: 1,
      //         value: false,
      //       },
      //       {
      //         component: 'checkbox',
      //         label: 'Low',
      //         id: 2,
      //         value: false,
      //       },
      //       {
      //         component: 'checkbox',
      //         label: 'Medium',
      //         id: 3,
      //         value: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: 'Status',
      //     children: [
      //       {
      //         component: 'checkbox',
      //         label: 'Active',
      //         id: 1,
      //         value: true,
      //       },
      //       {
      //         component: 'checkbox',
      //         label: 'Inactive',
      //         id: 2,
      //         value: true,
      //       },
      //     ],
      //   },
      //   {
      //     name: 'Date',
      //     children: [
      //       {
      //         component: 'dateCheckbox',
      //         label: 'Created On',
      //         value: false,
      //       },
      //       {
      //         component: 'dateCheckbox',
      //         label: 'Modified On',
      //         value: false,
      //       },
      //       {
      //         component: 'dateInput',
      //         label: 'Select Date From',
      //         value: '23rd Jan, 22',
      //       },
      //       {
      //         component: 'dateInput',
      //         label: 'Select Date To',
      //         value: '25th Jan, 22',
      //       },
      //     ],
      //   },
      // ],
    });
  },
}));
