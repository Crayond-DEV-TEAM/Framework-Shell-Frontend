import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PermissionInterface } from '../interface';
// import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
import { useRepository } from './repository';
import { findObjectByIndex, modifyObjectByIndexWithKey, updateChildOnParentChange } from './commonFunction';
import { useSlug } from '../common'

export const usePermission = create<PermissionInterface>((set, get) => ({
  RepositoryList: [],
  indexUpdateList: [],
  PermissionList: [],
  permissionId: '',
  addPermissionList: {
    name: '',
    description: '',
    is_active: true,
  },
  editPermissionList: {
    name: '',
    description: '',
    is_active: true,
  },

  fetching: false,
  errorOnFetching: false,

  fetchingPermission: false,
  errorOnPermission: false,

  setaddPermission: (payload: { key: string; value: string }) => {
    set((state) => ({ addPermissionList: { ...state.addPermissionList, [payload.key]: payload.value } }));
  },

  setRepositoryList: (data: any, id: any, key: any) => {
    set({ indexUpdateList: data, permissionId: id, RepositoryList: key });
  },
  setRepository: (type: string, value: string, data: any, isParent = false) => {
    const { indexUpdateList } = get();
    const jsonObject = indexUpdateList.data;
    if (isParent) {
      const res = updateChildOnParentChange(jsonObject, value?.toString(), data, data?.length > 0 ? data[data.length - 1] : "");
      set({ indexUpdateList: { data: res } });
    } else {
      const indexArray = value.replaceAll('-', '-child-').split('-');
      const foundObject = findObjectByIndex(jsonObject, indexArray);

      if (foundObject) {
        modifyObjectByIndexWithKey(foundObject, [], data, type);
      } else {
        console.log('Object not found');
      }
      set({ indexUpdateList: { data: jsonObject } });
    }
  },

  getPermissionList: () => {
    const { apiToken } = get();
    set({ fetchingPermission: true, errorOnPermission: false });
    const slugId = useSlug.getState().slugs?.IDM;

    // if (envConfig.api_url && envConfig.api_url.includes('sdk') && !slugId) {
    //   return;
    // }


    httpRequest('get', `${envConfig.api_url}/idm/permission/get`, {}, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          set({ PermissionList: response.data.data });
        } else {
          set({ PermissionList: ['no'] });
        }
      })
      .catch((err) => {
        set({ errorOnPermission: true });
        enqueueSnackbar('Something Went Wrong!' + `slugId ${slugId} - not found`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetchingPermission: false });
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ addPermissionList: { ...data } }));
  },
  addPermission: (data: any, repoId: any) => {
    const { clearAll, addPermissionList, getPermissionList, apiToken } = get();

    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug.getState().slugs?.IDM;
    // const { RepositoryList } = useRepository();
    const payload = {
      data: { data },
      name: addPermissionList.name,
      description: addPermissionList.description,
      is_active: addPermissionList.is_active,
      // repo_id:'4eb4f81c-154e-471f-baf2-c124dbdc9bf8'
      repo_id: repoId
      // project_service_mapping_id: slugId,
    };

    httpRequest('post', `${envConfig.api_url}/idm/permission/create`, payload, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Permission added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
        clearAll();
      });
  },

  editPermission: (data: any) => {
    const { clearAll, addPermissionList, getPermissionList, apiToken } = get();
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug.getState().slugs?.IDM;
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: addPermissionList.id,
      // data: { data },
      name: addPermissionList.name,
      description: addPermissionList.description,
      is_active: addPermissionList.is_active,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/idm/permission/edit`, payload, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Permission edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
        clearAll();
      });
  },

  deletePermission: (x: any) => {
    const { getPermissionList, apiToken } = get();
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug.getState().slugs?.IDM;
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: x.id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/permission/delete`, payload, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Permission deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPermissionList();
      });
  },

  updateRopsitory: () => {
    const { indexUpdateList, permissionId, getPermissionList, apiToken } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      data: { ...indexUpdateList },
      permission_id: permissionId,
      is_active: true,
    };
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug.getState().slugs?.IDM;
    httpRequest('put', `${envConfig.api_url}/idm/permission/update`, payload, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Permission edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
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
        is_active: true,
      },
    });
  },

  // These 2 states are for, component export purposes.
  apiToken: '',
  setApiToken: (apiToken) => {
    set({ apiToken: apiToken });
  },
}));
