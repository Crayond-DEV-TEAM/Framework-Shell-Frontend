import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { FeatureGroupInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
// import { tableJson } from '@components/feature/utils'
export const useFeatureGroup = create<FeatureGroupInterface>((set, get) => ({
  FeatureGroupList: [],

  fetching: false,
  errorOnFetching: false,

  createEditFeatureGroup: {
    name: '',
    id: '',
    is_active: true,
    features: [],
    description: '',
  },

  setFeatureGroupList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditFeatureGroup: { ...state.createEditFeatureGroup, [key]: value } }));
  },

  getFeatureGroupList: (data: any = { is_active: false }) => {
    set({ fetching: true, errorOnFetching: false });
    const payload: any = {
      offset: 0,
      limit: 50,
    };

    if (data.is_acive === true) {
      payload.is_active = true;
    }

    httpRequest('post', `${envConfig.api_url}/featureGroup`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.is_active,
                features: tableData.feature_group_mapings.length + ' ' + 'features',
                modified: tableData.updated_at,
                featureDetails: tableData.feature_group_mapings?.map((x: any) => x.feature),
                description: tableData.description,
              }),
            set({ FeatureGroupList: dataTable }),
          );
        } else {
          set({ FeatureGroupList: [] });
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
  createFeatureGroup: () => {
    set({ fetching: true, errorOnFetching: false });
    const { createEditFeatureGroup, getFeatureGroupList, clearAll } = get();
    const payload = {
      name: createEditFeatureGroup.name,
      is_active: createEditFeatureGroup.is_active,
      features: createEditFeatureGroup.features?.map((x: any) => x.id),
      description: createEditFeatureGroup.description,
    };

    httpRequest('post', `${envConfig.api_url}/featureGroup/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('FeatureGroup Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        clearAll();
        getFeatureGroupList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditFeatureGroup: { ...data } }));
  },
  editFeatureGroup: () => {
    set({ fetching: true, errorOnFetching: false });
    const { createEditFeatureGroup, getFeatureGroupList, clearAll } = get();
    const payload = {
      features: createEditFeatureGroup.features?.map((x: any) => x.id),
      name: createEditFeatureGroup.name,
      is_active: createEditFeatureGroup.is_active,
      description: createEditFeatureGroup.description,
      feature_group_id: createEditFeatureGroup.id,
    };

    httpRequest('put', `${envConfig.api_url}/featureGroup`, payload, true)
      .then((response) => {
        enqueueSnackbar('FeatureGroup Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        clearAll();
        getFeatureGroupList();
      });
  },
  deleteFeatureGroup: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const { getFeatureGroupList } = get();
    const payload = {
      feature_group_id: id,
    };
    httpRequest('delete', `${envConfig.api_url}/featureGroup`, payload, true)
      .then((response) => {
        enqueueSnackbar('FeatureGroup Deleted Succesfully!', { variant: 'success' });
        // set({ FeatureGroupList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getFeatureGroupList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getFeatureGroupList } = get();
    const payload = {
      feature_group_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/featureGroup`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getFeatureGroupList();
      });
  },
  clearAll: () => {
    set({
      createEditFeatureGroup: {
        name: '',
        id: '',
        is_active: false,
        features: [],
        description: '',
      },
    });
  },
}));
