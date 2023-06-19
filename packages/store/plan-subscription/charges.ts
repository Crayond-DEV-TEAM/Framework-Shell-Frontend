import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { ChargesInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useCharges = create<ChargesInterface>((set, get) => ({
  ChargesList: [],

  fetching: false,
  errorOnFetching: false,

  createEditCharges: {
    name: '',
    id: '',
    is_active: false,
    description: '',
  },

  setChargesList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditCharges: { ...state.createEditCharges, [key]: value } }));
  },

  getChargesList: () => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 0,
    };
    httpRequest('post', `${envConfig.api_url}/charges`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.is_active,
                attachedin: tableData.plan_charge_mappings.length + ' ' + 'plans',
                createdon: tableData.created_at,
                description: tableData.description,
              }),
            set({ ChargesList: dataTable }),
          );
        } else {
          set({ ChargesList: [] });
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
  createCharges: () => {
    set({ fetching: true, errorOnFetching: false });
    const { createEditCharges, getChargesList, clearAll } = get();
    const payload = {
      name: createEditCharges.name,
      is_active: createEditCharges.is_active,
      description: createEditCharges.description,
    };

    httpRequest('post', `${envConfig.api_url}/charges/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        clearAll();
        getChargesList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditCharges: { ...data } }));
  },
  editCharges: () => {
    set({ fetching: true, errorOnFetching: false });
    const { createEditCharges, getChargesList, clearAll } = get();
    const payload = {
      charge_id: createEditCharges.id,
      name: createEditCharges.name,
      is_active: createEditCharges.is_active,
      description: createEditCharges.description,
    };

    httpRequest('put', `${envConfig.api_url}/charges`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        clearAll();
        getChargesList();
      });
  },
  deleteCharges: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const { getChargesList } = get();
    const payload = {
      charge_id: id,
    };
    httpRequest('delete', `${envConfig.api_url}/charges`, payload, true)
      .then((response) => {
        enqueueSnackbar('Feature Deleted Succesfully!', { variant: 'success' });
        // set({ ChargesList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getChargesList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getChargesList } = get();
    const payload = {
      charge_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/charges`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getChargesList();
      });
  },
  clearAll: () => {
    set({
      createEditCharges: {
        name: '',
        id: '',
        is_active: false,
        description: '',
      },
    });
  },
}));
