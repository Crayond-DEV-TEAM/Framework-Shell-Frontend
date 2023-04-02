import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, queryClient, routeTo, ValidateEmail } from '@core/utils';
import { filterContent, localStorageKeys } from '@core/utils/constants';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { useRouting } from '../common';

export interface groupStateProps {
  filterContent: any;
  offset?: number;
  limit?: number;
  messageGroup?: any;
  addTitle?: string;
  addDescription?: string;
}

export interface MessageGroupProps {
  groupState: groupStateProps;
  messageGroup: any;
  editTableMessage: any;
  addMessage?: any;
  severtiy?: any;
  getSeverityDetails: () => void;
  loading: boolean;
  status?: any;
  setstatus?: any;
  language?: any;
  messageGroupId?: any;
  tableMessageData?: any;
  getAllTableGroup: (id: string) => void;
  deleteMessage: (id: string) => void;
  getStatus: (payload: any) => void;
  filterTableContent: (serverityFilter: any, createdOn: any, updateOn: any, messageGroupId: any) => void;
  editMessage: (payload: any, isEdit: boolean) => void;
  getAllMessageGroup: () => void;
  get: (id: string) => void;
  addMessageGroup: () => void;
  getTable: (id: string) => void;
  updateStatusReport: (satus: any) => void;
  addMessageTable: (languagePayload: any, messageGroupId: any) => void;
  tableEditMessage: (payload: any) => void;
  deleteTableMessage: (id: any) => void;
  handleStateChange: (key: any, value: any) => void;
  handleGroupChange: (key: string, value: any, parent: any, parentIndex: any, childrenIndex: any) => void;
  handleChipDelete: (label: string, index: number, parentIndex: number) => void;
}

export const useMessageGroup = create<MessageGroupProps>((set, get) => ({
  groupState: {
    filterContent: [
      {
        name: 'Severity',
        children: [
          {
            component: 'checkbox',
            label: 'Alert',
            id: 1,
            value: false,
          },
          {
            component: 'checkbox',
            label: 'Description',
            id: 2,
            value: false,
          },
          {
            component: 'checkbox',
            label: 'Title',
            id: 3,
            value: false,
          },
          {
            component: 'checkbox',
            label: 'Others',
            id: 4,
            value: false,
          },
        ],
      },
      {
        name: 'Status',
        children: [
          {
            component: 'checkbox',
            label: 'high',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'medium',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'low',
            value: false,
          },
          {
            componentName: 'switch',
            value: false,
          },
        ],
      },
      {
        name: 'Date',
        children: [
          {
            component: 'dateCheckbox',
            label: 'Created On',
            value: false,
          },
          {
            component: 'dateCheckbox',
            label: 'Modified On',
            value: false,
          },
          {
            component: 'dateInput',
            label: 'Select Date From',
            value: '23rd Jan, 22',
          },
          {
            component: 'dateInput',
            label: 'Select Date To',
            value: '25th Jan, 22',
          },
        ],
      },
    ],
    severityValue: '',
    offset: 0,
    limit: 50,
  },
  addMessage: {
    group_id: '',
    addTitle: '',
    addDescription: '',
    isAddGroup: false,
    severity_id: '',
  },
  editTableMessage: {
    title: '',
    description: '',
    isAddGroup: false,
    severity: '',
    msg_grp_id: '',
    msg_grp_msg_info_id: '',
    msg_grp_msg_data: [],
  },
  language: [],
  status: '',
  setstatus: [],
  messageGroupId: '',
  severtiy: [],
  messageGroup: null,
  tableMessageData: null,
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
            // 'http://localhost:3000/api/v1/message_groups/display_message_group',
            `${envConfig.api_url}/message_groups/display_message_group`,
            {
              offset: groupState?.offset,
              limit: groupState?.limit,
              // user_id: 7,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        set((state) => ({
          loading: false,
          messageGroup: data,
        }));
        return data;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  //Get All Message Group By ID
  get: async (id) => {
    try {
      const { addMessage } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['get'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/display_all_message_from_grp_by_id',
            `${envConfig.api_url}/message_groups/display_all_message_from_grp_by_id`,
            {
              id: id,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        return set((state) => ({
          addMessage: {
            group_id: data?.id,
            addTitle: data?.title ?? '',
            addDescription: data?.description ?? '',
            isAddGroup: data?.is_status ?? '',
          },
        }));
        // localStorage.setItem(localStorageKeys.messageTable, addMessage?.group_id);
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // Add  Group
  addMessageGroup: async () => {
    try {
      const { addMessage } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['addMessageGroup'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/add_message_group',
            `${envConfig.api_url}/message_groups/add_message_group`,
            {
              title: addMessage?.addTitle,
              description: addMessage?.addTitle,
              is_status: addMessage?.isAddGroup,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        enqueueSnackbar('New Message Group successfully Added!!!!', { variant: 'success' });
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // delete Message
  deleteMessage: async (id) => {
    try {
      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.api_url}/message_groups/delete_message_group`,
        {
          id: id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Deleted message Group Successfully!!', { variant: 'success' });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  // Edit Message
  editMessage: async (payload, isEdit) => {
    try {
      set({ loading: true });
      const response = await httpRequest(
        'put',
        // 'http://localhost:3000/api/v1/message_groups/edit_message_group',
        `${envConfig.api_url}/message_groups/edit_message_group`,
        {
          id: payload?.group_id,
          title: payload?.addTitle,
          description: payload?.addDescription,
          is_status: payload?.isAddGroup,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Edit Successfully!!', { variant: 'success' });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  // ---- Message Group api are above

  // AddMessage Table
  addMessageTable: async (languagePayload, messageGroupId) => {
    try {
      const { editTableMessage, status: serverity } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['addMessageTable'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/add_message_group',
            `${envConfig.api_url}/messages/add_message`,
            {
              title: editTableMessage?.title,
              description: editTableMessage?.description,
              is_status: editTableMessage?.is_status,
              severity_id: serverity,
              msg_grp_id: messageGroupId,
              msg_grp_msg_data: languagePayload,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        enqueueSnackbar('New Message Group successfully Added!!!!', { variant: 'success' });
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // Get Severity
  getSeverityDetails: async () => {
    try {
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['severity'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'get',
            // 'http://localhost:3000/api/v1/message_groups/add_message_group',
            `${envConfig.api_url}/messages/display_severity`,
            {},
            true,
          );
          return data;
        },
      });
      const severtiyCopy: any = [];
      if (Array.isArray(data) && data?.length > 0) {
        data.map((val) => {
          severtiyCopy.push({
            value: val?.id ?? '',
            label: val?.severity_name ?? '',
          });
        });
      }

      return set(() => ({
        loading: false,
        severtiy: severtiyCopy,
      }));
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // List Table Message
  getAllTableGroup: async (id: any) => {
    try {
      set({ loading: true });
      const { data, status, total_config_language } = await queryClient.fetchQuery({
        queryKey: ['table'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/display_message_group',
            `${envConfig.api_url}/message_groups/display_all_msg_in_grp`,
            {
              id: id,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        const dataTable: any = [];
        if (Array.isArray(data?.msg_grp_msgs_infos) && data?.msg_grp_msgs_infos?.length > 0) {
          data?.msg_grp_msgs_infos?.map(
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
                msg_grp_msgs: tableData?.msg_grp_msgs?.length + ' / ' + total_config_language ?? '',
                msg_grp_msgs_Total: tableData?.msg_grp_msgs,
                status: tableData?.is_status ?? '',
                title: tableData?.title ?? '',
                description: tableData?.description ?? '',
              }),

            // dataTable.push(obj)
          );
        }

        const dataTableCopy = [...dataTable];
        return set((state) => ({
          loading: false,
          tableMessageData: dataTable,
          setstatus: dataTableCopy?.filter(({ status }: any) => status).map(({ id }: any) => id),
        }));
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Sgain!', { variant: 'error' });
    }
  },

  // filter
  filterTableContent: async (serverityFilter: any, createdOn: any, updateOn: any, messageGroupId: any) => {
    try {
      const { groupState } = get();
      const { filterContent } = groupState;
      set({ loading: true });
      const { data, status, total_config_language } = await queryClient.fetchQuery({
        queryKey: ['filterTableContent'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/add_message_group',
            `${envConfig.api_url}/messages/filter_message`,
            {
              msg_grp_id: messageGroupId,
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
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        return set({
          loading: false,
          tableMessageData: data?.map((tableData: any, i: number) => ({
            id: tableData?.id ?? i,
            msg_grp_id: tableData?.msg_grp_id ?? '',
            updated_at: tableData?.updated_at ?? '',
            created_at: tableData?.created_at ?? '',
            severity: {
              label: `${tableData?.severity?.severity_name ?? ''}`,
              color: '#6F6F6F',
              bgColor: '#EAEAEA',
            },
            msg_grp_msgs: tableData?.msg_grp_msgs?.length + ' / ' + total_config_language ?? '',
            status: tableData?.is_status ?? '',
            title: tableData?.title ?? '',
            description: tableData?.description ?? '',
          })),
        });

        // dataTable.push(obj)
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // status
  getStatus: async (payload) => {
    try {
      set({ loading: true });
      const response = await httpRequest(
        'post',
        // 'http://localhost:3000/api/v1/messages/is_status',/api/v1/
        `${envConfig.api_url}/messages/is_status`,
        {
          id: payload?.id,
          is_status: payload?.status,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Status Updated!!', { variant: 'success' });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  //  Update Status
  updateStatusReport: (status: any) => {
    set({
      status,
    });
  },

  // delete Message
  deleteTableMessage: async (payload: any) => {
    try {
      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.api_url}/messages/delete_message`,
        {
          msg_grp_msg_info_id: payload?.id,
          msg_grp_msg_data: payload?.messageId,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Deleted message in Table Successfully!!', { variant: 'success' });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  // get Table
  getTable: async (id: any) => {
    try {
      const { editTableMessage } = get();

      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['get'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/display_all_message_from_grp_by_id',
            `${envConfig.api_url}/messages/display_message_by_id`,
            {
              id: id,
            },
            true,
          );
          return data;
        },
      });
      if (status === 200) {
        return set((state) => ({
          editTableMessage: {
            title: data?.title,
            description: data?.description,
            is_status: data?.is_status,
            msg_grp_id: data?.msg_grp_id,
            severtiy: data?.severity?.id,
            msg_grp_msg_info_id: data?.msg_grp_msg_info_id,
            msg_grp_msg_data: data?.msg_grp_msgs,
          },
        }));
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // Edit Message
  tableEditMessage: async (payload: any) => {
    try {
      const { severtiy } = get();
      set({ loading: true });
      const response = await httpRequest(
        'put',
        // 'http://localhost:3000/api/v1/message_groups/edit_message_group',
        `${envConfig.api_url}/api/v1/messages/edit_message`,
        {
          title: payload?.title,
          description: payload?.description,
          is_status: payload?.is_status,
          msg_grp_id: payload?.msg_grp_id,
          msg_grp_msg_info_id: payload?.msg_grp_msg_info_id,
          severity_id: severtiy,
          msg_grp_msg_data: payload?.msg_grp_msg_data,
        },

        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar('Edit Successfully!!', { variant: 'success' });
        return response;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },
  // handle Group Change
  handleGroupChange: (key: string, value: any, parent: any, parentIndex: any, childrenIndex: any) => {
    const { groupState } = get();
    groupState.filterContent[parentIndex].children[childrenIndex]['value'] = value;
    set({
      groupState: {
        ...groupState,
        [key]: value,
      },
    });
  },

  handleStateChange: (key: any, value: any) => {
    const { addMessage, editTableMessage } = get();
    set({
      addMessage: {
        ...addMessage,
        [key]: value,
      },
      editTableMessage: {
        ...editTableMessage,
        [key]: value,
      },
    });
  },

  // handle  Chip Delete
  handleChipDelete: (label: string, index: number, parentIndex: number) => {
    const { groupState } = get();
    groupState.filterContent[parentIndex].children[index].value = false;
    set({
      groupState: {
        ...groupState,
      },
    });
  },
}));
