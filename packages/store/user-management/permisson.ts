import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PermissionInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { RepoJson } from '@components/repositoryComponent/utils';
import { enqueueSnackbar } from 'notistack';

export const usePermission = create<PermissionInterface>((set, get) => ({
  RepositoryList: [],
  PermissionList: [],
  addPermissionList: {
    title: '',
    description: '',
    status: false,
  },
  editPermissionList: {
    title: '',
    description: '',
    status: false,
  },

  fetching: false,
  errorOnFetching: false,

  setaddPermission: (payload: { key: string; value: string }) => {
    set((state) => ({ addPermissionList: { ...state.addPermissionList, [payload.key]: payload.value } }));
  },

  getFaciltyRepository: () => {
    set({ fetching: true, errorOnFetching: false, RepositoryList: RepoJson });

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
  getPermissionList: () => {
    set({ fetching: true, errorOnFetching: false, PermissionList: permission });

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
  updateEditData: (data: any) => {
    set((state) => ({ addPermissionList: { ...data } }));
  },
  addPermission: () => {
    const { PermissionList, addPermissionList } = get();
    const update = {
      id: `${PermissionList.length + 1}`,
      title: addPermissionList.title,
      description: addPermissionList.description,
      status: addPermissionList.status,
    };

    // PermissionList.push({
    //   ...addPermissionList,
    // });
    PermissionList.push(update);
    set({ PermissionList: PermissionList });

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

  editPermission: () => {
    const { PermissionList, editPermissionList } = get();
    PermissionList.push({
      ...editPermissionList,
    });

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
      addPermissionList: {
        title: '',
        description: '',
        status: false,
      },
    });
  },
}));
