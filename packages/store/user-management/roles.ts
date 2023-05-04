import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { RolesInterface } from '../interface';
import { tableJson } from '../../ui/components/roles/utils';
export const useRoles = create<RolesInterface>((set, get) => ({
  RolesList: [],
  StatusList: [],
  addRole: {
    id: '',
    permission: '',
    title: '',
    description: '',
    status: false,
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
    set({ fetching: true, errorOnFetching: false, RolesList: tableJson });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RepositoryList: tableData });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  addRolesList: () => {
    const { RolesList, addRole } = get();
    RolesList.push({
      ...addRole,
    });
    set({ RolesList: RolesList });
    // set({ fetching: true, errorOnFetching: false, RolesList: tableJson });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RepositoryList: tableData });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  getStatusList: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RepositoryList: RepoJson });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  editRoleList: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RepositoryList: RepoJson });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  deleteRoleList: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RepositoryList: RepoJson });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  clearAll: () => {
    set({
      addRole: {
        id: '',
        permission: '',
        title: '',
        description: '',
        status: false,
      },
    });
  },
}));
