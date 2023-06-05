import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserManagementInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
// import { RepoJson } from '@components/repositoryComponent/utils';

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
    set({ fetching: true, errorOnFetching: false });

    httpRequest('get', `${envConfig.api_url}/repository`, {}, true)
      .then((response) => {
        const lastObject = response.data.data[response.data.data.length - 1];
        set({ RepositoryList: lastObject.data.editRepositoryList, RepositoryId: lastObject.id });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  createRepository: () => {
    const { RepositoryList, editRepositoryList, getAllRepository } = get();
    set({ onEditLoading: true, erroronEdit: false });

    httpRequest('post', `${envConfig.api_url}/repository/upsert`, { data: { editRepositoryList } }, true)
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
    const { RepositoryId, editRepositoryList, getAllRepository } = get();
    set({ onEditLoading: true, erroronEdit: false });
    const payload = {
      id: RepositoryId,
      data: { editRepositoryList },
    };

    httpRequest('post', `${envConfig.api_url}/repository/upsert`, payload, true)
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
}));
