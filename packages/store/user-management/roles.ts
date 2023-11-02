import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { RolesInterface } from '../interface';
// import { tableJson } from '../../ui/components/roles/utils';
import { enqueueSnackbar } from 'notistack';
import { ClearAll } from '@mui/icons-material';
export const useRoles = create<RolesInterface>((set, get) => ({
  RolesList: [],
  StatusList: [],
  addRole: {
    id: '',
    permission: [],
    name: '',
    description: '',
    is_active: false,
  },
  editRole: [],
  deleteRole: [],

  addLoading: false,
  errorOnadding: false,

  editLoading: false,
  errorOnediting: false,

  deleteLoading: false,
  errorOndelete: false,

  fetching: false,
  errorOnFetching: false,

  setaddMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ addRole: { ...state.addRole, [payload.key]: payload.value } }));
  },

  getRolesList: () => {
    const { apiToken } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 10000,
    };
    httpRequest('post', `${envConfig.api_url}/idm/roles/get`, payload, true, apiToken, {
      headers: { slug: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9' },
    })
      .then((response) => {
        const permssionJsonConstruct = (tableData: any) => {
          return tableData.role_permission_mappings.map((value: any) => {
            return {
              label: value.permission.name,
              name: value.permission.name,
              color: '#305AAE',
              bgColor: '#E2EAFA',
              id: value.permission.id,
            };
          });
        };
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                name: tableData.name,
                description: tableData.description,
                is_active: tableData.is_active,
                id: tableData.id,
                permission: Array.isArray(tableData.role_permission_mappings)
                  ? permssionJsonConstruct(tableData)
                  : {
                      label: tableData.permission.name,
                      name: tableData.permission.name,
                      color: '#305AAE',
                      bgColor: '#E2EAFA',
                      id: tableData.permission.id,
                    },
              }),
            set({ RolesList: dataTable }),
          );
        } else {
          set({ RoleList: ['no'] });
        }
      })

      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ addRole: { ...data } }));
  },

  addRolesList: async () => {
    const { addRole, getRolesList, clearAll, apiToken } = get();
    const permissionid = addRole.permission.map((value: any) => value.id);
    const payload = {
      name: addRole.name,
      permissions: permissionid,
      description: addRole.description,
      is_active: addRole.is_active,
    };
    return new Promise((resolve, reject) => {
      httpRequest('post', `${envConfig.api_url}/idm/roles/create`, payload, true, apiToken, {
        headers: { slug: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9' },
      })
        .then((response) => {
          enqueueSnackbar('Roles created succesfully!', { variant: 'success' });
          console.log('In the promise now');

          resolve(response?.data?.data);
        })
        .catch((err) => {
          enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
          set({ errorOnFetching: true });
          reject(err);
        })
        .finally(() => {
          set({ fetching: false });
          getRolesList();
          clearAll();
        });
    });
  },
  getStatusList: async (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getRolesList, apiToken } = get();
    const payload = {
      role_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/idm/roles/update`, payload, true, apiToken, {
      headers: { slug: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9' },
    })
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
      });
  },
  editRoleList: async () => {
    const { addRole, getRolesList, clearAll, apiToken } = get();
    const permissionid = addRole.permission.map((value: any) => value.id);
    const payload = {
      role_id: addRole.id,
      name: addRole.name,
      permissions: permissionid,
      description: addRole.description,
      is_active: addRole.is_active,
    };

    set({ fetching: true, errorOnFetching: false });

    return new Promise((resolve, reject) => {
      return httpRequest('put', `${envConfig.api_url}/idm/roles/update`, payload, true, apiToken, {
        headers: { slug: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9' },
      })
        .then((response) => {
          enqueueSnackbar('Roles edited succesfully!', { variant: 'success' });
          resolve(response?.data?.data);
        })
        .catch((err) => {
          enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
          set({ errorOnFetching: true });
          reject(err);
        })
        .finally(() => {
          set({ fetching: false });
          getRolesList();
          clearAll();
        });
    });
  },

  deleteRoleList: async (id: string) => {
    const { getRolesList, apiToken } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      role_id: id,
    };

    httpRequest('delete', `${envConfig.api_url}/idm/roles/delete`, payload, true, apiToken, {
      headers: { slug: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9' },
    })
      .then((response) => {
        enqueueSnackbar('Roles deleted succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
      });
  },

  clearAll: () => {
    set({
      addRole: {
        id: '',
        permission: '',
        name: '',
        description: '',
        is_active: false,
      },
    });
  },

  // These 2 states are for, component export purposes.
  apiToken: '',
  setApiToken: (apiToken) => {
    set({ apiToken: apiToken });
  },
}));
