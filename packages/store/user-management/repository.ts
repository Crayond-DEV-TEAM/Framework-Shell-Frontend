import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserManagementInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
// import { RepoJson } from '@components/repositoryComponent/utils';

export const useRepository = create<UserManagementInterface>((set, get) => ({
  RepositoryList: [],
  editRepositoryList: {},

  fetching: false,
  errorOnFetching: false,

  seteditRepository: (value: any) => {
    set({ editRepositoryList: value });
  },

  getAllRepository: () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('get', `${envConfig.api_url}/repository`, {}, true)
      .then((response) => {
        const lastObject = response.data.data[response.data.data.length - 1];
        set({ RepositoryList: lastObject.data.editRepositoryList });
        console.log(lastObject.data.editRepositoryList, '//////////////');
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  editRepository: () => {
    const { RepositoryList, editRepositoryList } = get();
    // RepositoryList.push({
    //   ...editRepositoryList,
    // });
    // const payload = {
    //   data: editRepositoryList,
    // };
    httpRequest('post', `${envConfig.api_url}/repository/create`, { data: { editRepositoryList } }, true)
      .then((response) => {
        enqueueSnackbar('Json Updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
}));
