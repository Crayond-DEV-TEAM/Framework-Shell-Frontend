import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { CustomerInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
import { tableJson } from '@components/customer/utils';
export const useCustomer = create<CustomerInterface>((set, get) => ({
  CustomerList: [],
  fetching: false,
  errorOnFetching: false,
  //   setaddPermission: (payload: { key: string; value: string }) => {
  //     set((state) => ({ addPermissionList: { ...state.addPermissionList, [payload.key]: payload.value } }));
  //   },

  getCustomerList: () => {
    set({ fetching: true, errorOnFetching: false, CustomerList: tableJson });

    httpRequest('get', `${envConfig.api_url}`, {}, true)
      .then((response) => {
        // set({ CustomerList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
    getCustomerList: () => {
    set({ fetching: true, errorOnFetching: false, CustomerList: tableJson });

    httpRequest('get', `${envConfig.api_url}`, {}, true)
      .then((response) => {
        // set({ CustomerList: response.data.data });
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
