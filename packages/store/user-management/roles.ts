import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { RolesInterface } from '../interface';
import { tableJson } from '../../ui/components/roles/utils';
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
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 10000,
    };
    httpRequest('post', `${envConfig.idm_api_url}/roles`, payload, true)
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

  addRolesList: () => {
    const { addRole, getRolesList, clearAll } = get();
    const permissionid = addRole.permission.map((value: any) => value.id);
    const payload = {
      name: addRole.name,
      permissions: permissionid,
      description: addRole.description,
      is_active: addRole.is_active,
    };
    httpRequest('post', `${envConfig.idm_api_url}/roles/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles created succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getRolesList } = get();
    const payload = {
      role_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.idm_api_url}/roles/update`, payload, true)
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
  editRoleList: () => {
    const { addRole, getRolesList, clearAll } = get();
    const permissionid = addRole.permission.map((value: any) => value.id);
    const payload = {
      role_id: addRole.id,
      name: addRole.name,
      permissions: permissionid,
      description: addRole.description,
      is_active: addRole.is_active,
    };

    set({ fetching: true, errorOnFetching: false });

    httpRequest('put', `${envConfig.idm_api_url}/roles/update`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles edited succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
        clearAll();
      });
  },

  deleteRoleList: (id: string) => {
    const { getRolesList } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      role_id: id,
    };

    httpRequest('delete', `${envConfig.idm_api_url}/roles`, payload, true)
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
}));
