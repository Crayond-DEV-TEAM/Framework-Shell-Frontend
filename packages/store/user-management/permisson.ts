import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PermissionInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
// import { RepoJson } from '@components/repositoryComponent/utils';
import { enqueueSnackbar } from 'notistack';
import { useRepository } from './repository';

export const usePermission = create<PermissionInterface>((set, get) => ({
  // RepositoryList: [],
  PermissionList: [],
  addPermissionList: {
    name: '',
    description: '',
    is_active: false,
  },
  editPermissionList: {
    name: '',
    description: '',
    is_active: false,
  },

  fetching: false,
  errorOnFetching: false,

  setaddPermission: (payload: { key: string; value: string }) => {
    set((state) => ({ addPermissionList: { ...state.addPermissionList, [payload.key]: payload.value } }));
  },

  getFaciltyRepository: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('post', `${envConfig.api_url}`, {}, true)
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
    set({ fetching: true, errorOnFetching: false });

    httpRequest('get', `${envConfig.api_url}/permissions`, {}, true)
      .then((response) => {
        set({ PermissionList: response.data.data });
        console.log(response.data.data, 'ajahdkasjhdkjashdkasjdh');
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
  addPermission: (data: any) => {
    const { PermissionList, addPermissionList, getPermissionList } = get();

    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      data: { data },
      name: addPermissionList.name,
      description: addPermissionList.description,
      is_active: addPermissionList.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/permissions/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
      });
  },

  editPermission: (data: any) => {
    const { PermissionList, addPermissionList, getPermissionList } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: addPermissionList.id,
      // data: { data },
      name: addPermissionList.name,
      description: addPermissionList.description,
      is_active: addPermissionList.is_active,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/permissions`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
      });
  },

  deletePermission: (x: any) => {
    const { addPermissionList, getPermissionList } = get();
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
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
      });
  },

  clearAll: () => {
    set({
      addPermissionList: {
        name: '',
        description: '',
        is_active: false,
      },
    });
  },
}));
