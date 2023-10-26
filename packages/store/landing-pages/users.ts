import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import {  UserLandingInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useUserLanding = create<UserLandingInterface>((set, get) => ({
  ProjectList: [],
  fetching: false,
  errorOnFetching: false,
//   OrganisationList: [];

  OrganisationList: {
    id: '',
    name: '',
  },

  getUserProjectList: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: id,
    };

    httpRequest('post', `${envConfig.idm_api_url}/projects/get`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        debugger;
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                projectTitle: tableData.name,
                is_active: false,
                // serviceMapped: tableData.project_user_mappings.length + ' ' + 'services',
                description: tableData.description,
                data: tableData,
              }),
            set({ ProjectList: dataTable }),
          );
        } else {
          set({ ProjectList: [] });
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

}));

