import { envConfig } from '@core/envconfig';
import { convertKeysToCamelCase, convertKeysToSnakeCase, httpRequest } from '@core/utils';
import { create } from 'zustand';
import { AddOnsInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import { useSlug } from '../common';
// import { tableJson } from '@components/feature/utils'

export const useAddOns = create<AddOnsInterface>((set, get) => ({
  AddOnsList: [],

  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditAddOns: {
    name: '',
    id: '',
    is_active: true,
    features: {},
    description: '',
    featuregroup: {},
  },

  setAddOnsList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditAddOns: { ...state.createEditAddOns, [key]: value } }));
  },

  getAddOnsList: (data: any = { is_active: false }) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const payload: any = {
      offset: 0,
      limit: 100,
    };

    if (data.is_acive === true) {
      payload.is_active = true;
    }

    httpRequest('post', `${envConfig.api_url}/pasm/addon/get`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.isActive,
                featuregroup: tableData.featureGroup,
                attachedin: tableData.planAddOnMappings.length + ' ' + 'plans',
                feature: tableData.feature,
                description: tableData.description,
                createdon: moment(tableData.created_at).format('DD- MMM - YYYY'),
              }),
            set({ AddOnsList: dataTable }),
          );
        } else {
          set({ AddOnsList: [] });
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
  createAddOns: () => {
    set({ addsave: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditAddOns, getAddOnsList, clearAll } = get();
    const payload = {
      name: createEditAddOns.name,
      is_active: createEditAddOns.is_active,
      feature_id: (createEditAddOns.features as { id: string }).id,
      description: createEditAddOns.description,
      feature_group_id: (createEditAddOns.featuregroup as { id: string }).id,
    };

    httpRequest('post', `${envConfig.api_url}/pasm/addon/create`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Add-On Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ addsave: false });
        clearAll();
        getAddOnsList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditAddOns: { ...data } }));
  },
  editAddOns: () => {
    set({ editsave: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditAddOns, getAddOnsList, clearAll } = get();
    const payload = {
      feature_id: (createEditAddOns.features as { id: string }).id,
      name: createEditAddOns.name,
      is_active: createEditAddOns.is_active,
      description: createEditAddOns.description,
      feature_group_id: (createEditAddOns.featuregroup as { id: string }).id,
      addon_id: createEditAddOns.id,
    };

    httpRequest('put', `${envConfig.api_url}/pasm/addon/update`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Add-On Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ editsave: false });
        clearAll();
        getAddOnsList();
      });
  },
  deleteAddOns: (id: string) => {
    set({ deletefetch: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getAddOnsList } = get();
    const payload = {
      addon_id: id,
    };
    httpRequest('delete', `${envConfig.api_url}/pasm/addon/delete`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Add-On Deleted Succesfully!', { variant: 'success' });
        // set({ AddOnsList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ deletefetch: false });
        getAddOnsList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getAddOnsList } = get();
    const payload = {
      addon_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/pasm/addon/update`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAddOnsList();
      });
  },
  clearAll: () => {
    set({
      createEditAddOns: {
        name: '',
        id: '',
        is_active: true,
        features: {},
        description: '',
        featuregroup: {},
      },
    });
  },
}));
