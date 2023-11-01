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
  editTableMessage?: any;
  status?: any;
  severtiy?: any;
  messageGroupId?: any;
  language?: any;
  setstatus?: any;
}

export interface MessageGroupProps {
  groupState: groupStateProps;
  getSeverityDetails: () => void;
  loading: boolean;
  tableMessageData?: any;
  getAllTableGroup: (id: string) => void;
  clearfilter: () => void;
  getStatus: (payload: any) => void;
  filterTableContent: (serverityFilter: any, createdOn: any, updateOn: any, messageGroupId: any) => void;
  getTable: (id: string) => void;
  updateStatusReport: (satus: any) => void;
  clearAddMessageState: () => void;
  addMessageTable: (languagePayload: any, messageGroupId: any) => void;
  tableEditMessage: (payload: any) => void;
  deleteTableMessage: (id: any) => void;
  handleStateChange: (key: any, value: any) => void;
  updateStateAddGroup: () => void;
  updateErrorAddGroup: (error: any) => void;
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
            label: 'High',
            id: 1,
            value: false,
          },
          {
            component: 'checkbox',
            label: 'Low',
            id: 2,
            value: false,
          },
          {
            component: 'checkbox',
            label: 'Medium',
            id: 3,
            value: false,
          },
        ],
      },
      {
        name: 'Status',
        children: [
          {
            component: 'checkbox',
            label: 'Active',
            id: 1,
            value: true,
          },
          {
            component: 'checkbox',
            label: 'Inactive',
            id: 2,
            value: true,
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
    editTableMessage: {
      title: '',
      description: '',
      isAddGroup: false,
      severity: '',
      msg_grp_id: '',
      language_value: '',
      msg_grp_msg_info_id: '',
      msg_grp_msg_data: [],
      error: {
        addTitle: '',
        addDescription: '',
      },
    },
    language: [],
    status: '',
    setstatus: [],
    messageGroupId: '',
    severtiy: [],
  },

  tableMessageData: null,
  loading: false,

  // AddMessage Table
  addMessageTable: async (languagePayload, messageGroupId) => {
    try {
      const { groupState } = get();
      const { editTableMessage, status: serverity } = groupState;
      set({ loading: true });
      const { data, status, message } = await queryClient.fetchQuery({
        queryKey: ['addMessageTable'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.message_api_url}/message_catalog/add_message`,
            {
              title: editTableMessage?.title,
              description: editTableMessage?.description,
              is_status: editTableMessage?.isAddGroup,
              language_value: editTableMessage?.language_value,
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
        enqueueSnackbar('New Message Group successfully Added!!!!', { variant: 'success', autoHideDuration: 5000 });
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
      const { groupState } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['severity'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'get',
            // 'http://localhost:3000/api/v1/message_groups/add_message_group',
            `${envConfig.message_api_url}/messages/display_severity`,
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
        groupState: {
          ...groupState,
          severtiy: severtiyCopy,
        },
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
      const { groupState } = get();
      const { setstatus } = groupState;
      set({ loading: true });
      const { data, status, total_config_language } = await queryClient.fetchQuery({
        queryKey: ['table'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            // 'http://localhost:3000/api/v1/message_groups/display_message_group',
            `${envConfig.message_api_url}/message_catalog/display_all_msg_in_grp`,
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
          groupState: {
            ...groupState,
            setstatus: dataTableCopy?.filter(({ status }: any) => status).map(({ id }: any) => id),
          },
        }));
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
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
            `${envConfig.message_api_url}/messages/filter_message`,
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
            undefined,
            'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
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
        `${envConfig.message_api_url}/messages/is_status`,
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
  updateStatusReport: (statusId: any) => {
    const { groupState } = get();
    const { status } = groupState;
    set({
      groupState: {
        ...groupState,
        status: statusId,
      },
    });
  },

  // delete Message
  deleteTableMessage: async (payload: any) => {
    debugger
    try {

      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.message_api_url}/message_catalog/delete_message`,
        {
          msg_grp_msg_info_id: payload?.delid,
          msg_grp_msg_data: payload?.messageId,
        },
        true,
        undefined,
        'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
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
      const { groupState } = get();
      const { editTableMessage } = groupState;

      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['get'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.message_api_url}/message_catalog/display_message_by_id`,
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
            status: data?.severity?.id,
            editTableMessage: {
              ...editTableMessage,
              title: data?.title,
              description: data?.description,
              isAddGroup: data?.is_status,
              msg_grp_id: data?.msg_grp_id,
              severtiy: data?.severity?.id,
              msg_grp_msg_info_id: data?.id,
              msg_grp_msg_data: data?.msg_grp_msgs,
            },
          },
        }));
      }
      return set({
        loading: false,
      });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  // Edit Message
  tableEditMessage: async (payload: any) => {
    try {
      const { groupState } = get();
      const { status } = groupState;
      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.message_api_url}/message_catalog/edit_message`,
        {
          title: payload?.title,
          description: payload?.description,
          is_status: payload?.isAddGroup,
          msg_grp_id: payload?.msg_grp_id,
          msg_grp_msg_info_id: payload?.msg_grp_msg_info_id,
          severity_id: status,
          msg_grp_msg_data: payload?.msg_grp_msg_data,
        },
        true,
        undefined,
        'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
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
    const { groupState } = get();
    const { editTableMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        editTableMessage: {
          ...editTableMessage,
          [key]: value,
        },
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

  clearAddMessageState: () => {
    const { groupState } = get();
    const { editTableMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        editTableMessage: {
          ...editTableMessage,
          title: '',
          description: '',
          isAddGroup: false,
          severity: '',
          msg_grp_id: '',
          msg_grp_msg_info_id: '',
          msg_grp_msg_data: [],
          error: {
            addTitle: '',
            addDescription: '',
          },
        },
        status: '',
      },
    });
  },

  updateErrorAddGroup: (error: any) => {
    const { groupState } = get();
    const { editTableMessage } = groupState;
    set({
      groupState: {
        ...groupState,
        editTableMessage: {
          ...editTableMessage,
          error: {
            ...editTableMessage.error,
            error,
          },
        },
      },
    });
  },

  clearfilter: () => {
    const { groupState } = get();
    const { filterContent } = groupState;
    set({
      groupState: {
        ...groupState,
        filterContent: [
          ...filterContent,
          {
            name: 'Severity',
            children: [
              {
                component: 'checkbox',
                label: 'High',
                id: 1,
                value: false,
              },
              {
                component: 'checkbox',
                label: 'Low',
                id: 2,
                value: false,
              },
              {
                component: 'checkbox',
                label: 'Medium',
                id: 3,
                value: false,
              },
              {
                component: 'checkbox',
                label: 'Moderate',
                id: 4,
                value: false,
              },
            ],
          },
          {
            name: 'Status',
            children: [
              {
                // label: 'No Data',
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
      },
    });
  },

  updateStateAddGroup: () => {
    const { groupState } = get();
    const { editTableMessage } = groupState;
    set((state) => ({
      groupState: {
        ...state?.groupState,
        editTableMessage: {
          ...editTableMessage,
          title: '',
          description: '',
        },
      },
      loading: false,
    }));
  },
}));
