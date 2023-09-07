import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { AdminInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
// import { findObjectByIndex, modifyObjectByIndexWithKey } from './commonFunction';
export const useAdmin = create<AdminInterface>((set, get) => ({
  adminList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditAdmin: {
    projectTitle: '',
    description: '',
    services: [''],
    mappedUser: [''],
    is_active: false,
    access: false,
    id: '',
  },

  seteditAdmin: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: payload.value } }));
  },

  getAdminList: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('get', `${envConfig.api_url}/projects`, {}, true)
      .then((response) => {
        debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.is_active,
                attachedin: tableData.plan_charge_mappings.length + ' ' + 'plans',
                description: tableData.description,
              }),
            set({ adminList: dataTable }),
          );
        } else {
          set({ adminList: [] });
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
    set((state) => ({ createEditAdmin: { ...data } }));
  },
  createAdmin: () => {
    const { clearAll, createEditAdmin, getAdminList } = get();

    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      // data: { data },
      // name: addPermissionList.name,
      // description: addPermissionList.description,
      // is_active: addPermissionList.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
        clearAll();
      });
  },

  editAdmin: () => {
    const { clearAll, getAdminList } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      // permission_id: getAdminList.id,
      // // data: { data },
      // name: getAdminList.name,
      // description: addPermissionList.description,
      // is_active: addPermissionList.is_active,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getAdminList } = get();
    const payload = {
      role_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
      });
  },

  deleteAdmin: (x: any) => {
    const { getAdminList } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: x.id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/permissions`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
      });
  },

  clearAll: () => {
    set({
      createEditAdmin: {
        projectTitle: '',
        description: '',
        services: [''],
        mappedUser: [''],
        is_active: false,
        access: false,
        id: '',
      },
    });
  },
}));
