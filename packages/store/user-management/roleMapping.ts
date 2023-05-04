import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { RolesMappingInterface } from '../interface';
import { tableJson } from '../../ui/components/roleMapping/utils';
export const useRoleMapping = create<RolesMappingInterface>((set, get) => ({
  RolesMappingList: [],
  StatusList: [],

  fetching: false,
  errorOnFetching: false,

  getRolesMappingList: () => {
    set({ fetching: true, errorOnFetching: false, RolesMappingList: tableJson });

    httpRequest('post', `${envConfig.api_url}/api`, {}, true)
      .then((response) => {
        // set({ RolesMappingList: tableJson });
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
}));
