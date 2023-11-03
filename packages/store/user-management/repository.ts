import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserManagementInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { useSlug } from '../common';

export const useRepository = create<UserManagementInterface>((set, get) => ({
  RepositoryList: [],
  editRepositoryList: {},
  RepositoryId: '',

  fetching: false,
  errorOnFetching: false,

  onEditLoading: false,
  erroronEdit: false,

  seteditRepository: (value: any) => {
    set({ editRepositoryList: value });
  },

  getAllRepository: () => {
    const { apiToken } = get();

    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug.getState().slugs?.IDM;

    httpRequest('get', `${envConfig.api_url}/idm/repository/get`, {}, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        const lastObject = response.data.data[response.data.data.length - 1];
        set({ RepositoryList: lastObject.data, RepositoryId: lastObject.id });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  createRepository: () => {
    const { editRepositoryList, getAllRepository, apiToken } = get();
    set({ onEditLoading: true, erroronEdit: false });
    const data = editRepositoryList;
    const slugId = useSlug.getState().slugs?.IDM;

    httpRequest('post', `${envConfig.api_url}/idm/repository/create`, { data, is_active: true }, true, apiToken, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Json Updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ erroronEdit: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ onEditLoading: false });
        getAllRepository();
      });
  },
  editRepository: () => {
    const { RepositoryId, editRepositoryList, getAllRepository, apiToken } = get();
    set({ onEditLoading: true, erroronEdit: false });
    const slugId = useSlug.getState().slugs?.IDM;

    const data = editRepositoryList;

    httpRequest(
      'post',
      `${envConfig.api_url}/idm/repository/create`,
      { id: RepositoryId, data, is_active: true },
      true,
      apiToken,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Json Updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ erroronEdit: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ onEditLoading: false });
        getAllRepository();
      });
  },

  // These 2 states are for, component export purposes.
  apiToken: '',
  setApiToken: (apiToken) => {
    set({ apiToken: apiToken });
  },
}));
