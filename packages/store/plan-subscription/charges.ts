import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { ChargesInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '@core/utils/helperFunctions';
import { useSlug } from '../common';

const slugId = useSlug?.getState()?.slugs?.PASM;
export const useCharges = create<ChargesInterface>((set, get) => ({
  ChargesList: [],

  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditCharges: {
    name: '',
    id: '',
    is_active: false,
    description: '',
  },

  setChargesList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditCharges: { ...state.createEditCharges, [key]: value } }));
  },

  getChargesList: (data: any = { is_active: false }) => {
    set({ fetching: true, errorOnFetching: false });
    const payload: any = {
      offset: 0,
      limit: 100,
      // is_active: true,
    };

    if (data.is_acive === true) {
      payload.is_active = true;
    }

    httpRequest('post', `${envConfig.api_url}/pasm/charges/get`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          convertKeysToSnakeCase(response.data.data.rows).map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.is_active ?? tableData.isActive,
                attachedin: tableData.plan_charge_mappings.length + ' ' + 'plans',
                createdon: moment(tableData.created_at ?? tableData?.createdAt).format('DD- MMM - YYYY'),
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
    set({ addsave: true, errorOnFetching: false });
    const { createEditCharges, getChargesList, clearAll } = get();
    const payload = {
      name: createEditCharges.name,
      is_active: createEditCharges.is_active,
      description: createEditCharges.description,
    };

    httpRequest('post', `${envConfig.api_url}/pasm/charges/create`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Charges Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ addsave: false });
        clearAll();
        getChargesList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditCharges: { ...data } }));
  },
  editCharges: () => {
    set({ editsave: true, errorOnFetching: false });
    const { createEditCharges, getChargesList, clearAll } = get();
    const payload = {
      charge_id: createEditCharges.id,
      name: createEditCharges.name,
      is_active: createEditCharges.is_active,
      description: createEditCharges.description,
    };

    httpRequest('put', `${envConfig.api_url}/pasm/charges/update`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Charges Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ editsave: false });
        clearAll();
        getChargesList();
      });
  },
  deleteCharges: (id: string) => {
    set({ deletefetch: true, errorOnFetching: false });
    const { getChargesList } = get();
    const payload = {
      charge_id: id,
    };
    httpRequest(
      'delete',
      `${envConfig.api_url}/pasm/charges/delete`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Charges Deleted Succesfully!', { variant: 'success' });
        // set({ ChargesList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ deletefetch: false });
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

    httpRequest('put', `${envConfig.api_url}/pasm/charges/update`, convertKeysToCamelCase(payload), true, undefined, {
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
