import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserManagementInterface } from '../interface';
import { RepoJson } from '@components/repositoryComponent/utils';

export const useRepository = create<UserManagementInterface>((set, get) => ({
  RepositoryList: [],
  editRepositoryList: {
    mainTitle: '',
    title: '',
    titlesecond: '',
    contentone: '',
    contentTwo: '',
    contentThree: '',
    contentfour: '',
  },

  fetching: false,
  errorOnFetching: false,

  seteditRepository: (value: any) => {
    set({ editRepositoryList: value });
  },

  getAllRepository: () => {
    set({ fetching: true, errorOnFetching: false, RepositoryList: RepoJson });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        set({ RepositoryList: RepoJson });
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
    RepositoryList.push({
      ...editRepositoryList,
    });

    set({ RepositoryList: RepositoryList });
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
}));
