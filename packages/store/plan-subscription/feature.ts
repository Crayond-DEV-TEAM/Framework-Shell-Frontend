import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { FeatureInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
// import { tableJson } from '@components/feature/utils'
export const useFeature = create<FeatureInterface>((set, get) => ({
  FeatureList: [],

  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditFeature: {
    name: '',
    id: '',
    is_active: true,
  },

  setFeatureList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditFeature: { ...state.createEditFeature, [key]: value } }));
  },

  getFeatureList: (data: any = { is_active: false }) => {
    set({ fetching: true, errorOnFetching: false });
    const payload: any = {
      offset: 0,
      limit: 100,
    };

    if (data.is_active === true) {
      payload.is_active = true;
    }
    if (data.is_unmapped === true) {
      payload.is_unmapped = true;
    } else if (data.is_unmapped === false) {
      payload.is_unmapped = false;
    }

    httpRequest('post', `${envConfig.api_url}/features`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                name: tableData.name,
                is_active: tableData.is_active,
                id: tableData.id,
              }),
            set({ FeatureList: dataTable }),
          );
        } else {
          set({ FeatureList: [] });
          set({ FeatureList: [] });
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
  createFeature: () => {
    set({ addsave: true, errorOnFetching: false });
    const { createEditFeature, getFeatureList } = get();
    const payload = {
      name: createEditFeature.name,
      is_active: createEditFeature.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/features/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ addsave: false });
        getFeatureList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditFeature: { ...data } }));
  },
  editFeature: () => {
    set({ editsave: true, errorOnFetching: false });
    const { createEditFeature, getFeatureList } = get();
    const payload = {
      feature_id: createEditFeature.id,
      name: createEditFeature.name,
      is_active: createEditFeature.is_active,
    };

    httpRequest('put', `${envConfig.api_url}/features`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ editsave: false });
        getFeatureList();
      });
  },
  deleteFeature: (id: string) => {
    set({ deletefetch: true, errorOnFetching: false });
    const { getFeatureList } = get();
    const payload = {
      feature_id: id,
    };
    httpRequest('delete', `${envConfig.api_url}/features`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Deleted Succesfully!', { variant: 'success' });
        // set({ FeatureList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ deletefetch: false });
        getFeatureList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getFeatureList } = get();
    const payload = {
      feature_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/features`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getFeatureList();
      });
  },
  clearAll: () => {
    set({
      createEditFeature: {
        name: '',
        id: '',
        is_active: false,
      },
    });
  },
}));
