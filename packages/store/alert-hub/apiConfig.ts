import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { APIConfig } from '../interface';
import { useSlug } from '../common';

export const useAPIConfig = create<APIConfig>((set, get) => ({
  apiCallsList: '',
  requestAPI: [],
  getPushBody: [],
  getResquestBody: [],
  errorOnFetching: false,
  fetching: false,

  getRequest: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.alert_hub}/`,
      {
        // id using for now
        profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967',
      },
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  getPushTableList: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.alert_hub}/`,
      {
        // id using for now
      },
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
    )
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response?.data) && response?.data?.length > 0) {
          response?.data?.map(
            (tableData: any, i: any) =>
              dataTable.push({
                parameter: tableData?.parameter ? tableData?.parameter : '-',
                type: tableData?.type ? tableData?.type : '-',
                description: tableData?.description ? tableData?.description : '-',
              }),
            set({ getPushBody: dataTable }),
          );
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  getResquestBodyData: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.alert_hub}/`,
      {
        // id using for now
      },
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
}));
