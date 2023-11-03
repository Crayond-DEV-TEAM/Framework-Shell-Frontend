import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PlanInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '@core/utils/helperFunctions';
import { useSlug } from '../common';
// import { tableJson } from '@components/feature/utils'


const slugId = useSlug?.getState()?.slugs?.PASM;
export const usePlan = create<PlanInterface>((set, get) => ({
  PlanList: [],

  getPlanList: () => {
    // set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 20,
    };
    httpRequest('post', `${envConfig.api_url}/pasm/plans/get`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          convertKeysToSnakeCase(response.data.data.rows).map(
            (tableData: any, i: any) =>
              dataTable.push({
                name: tableData.name,
                is_active: tableData.is_active,
                id: tableData.id,
              }),
            set({ PlanList: response.data.data.rows }),
          );
        } else {
          set({ PlanList: ['no'] });
        }
      })
      .catch((err) => {
        // set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        // set({ fetching: false });
      });
  },
}));
