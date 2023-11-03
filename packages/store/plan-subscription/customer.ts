import { envConfig } from '@core/envconfig';
import { convertKeysToCamelCase, convertKeysToSnakeCase, httpRequest } from '@core/utils';
import { create } from 'zustand';
import { CustomerInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { useSlug } from '../common';

export const useCustomer = create<CustomerInterface>((set, get) => ({
  CustomerList: [],
  fetching: false,
  errorOnFetching: false,
  isEdit: false,
  addsave: false,
  editsave: false,
  deletefetch: false,
  createEditCustomer: {
    name: '',
    email_id: '',
    contact_number: '',
    company_name: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
    pincode: 0,
    is_active: false,
    id: '',
    address_id: '',
  },
  setCustomerList: (key: string, value: boolean | string) => {
    set((state) => ({ createEditCustomer: { ...state.createEditCustomer, [key]: value } }));
  },
  seteditadd: (value: boolean) => {
    set((state) => ({ isEdit: value }));
  },
  getCustomerList: () => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const payload = {
      offset: 0,
      limit: 10,
    };
    httpRequest('post', `${envConfig.api_url}/pasm/customer/get`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                customerid: tableData.aliasId,
                companyName: tableData.companyName,
                customerName: tableData.name,
                email: tableData.emailId,
                is_active: tableData.isActive,
                dataList: tableData,
                id: tableData.id,
              }),
            set({ CustomerList: dataTable }),
          );
        } else {
          set({ CustomerList: [] });
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
  createCustomer: () => {
    set({ addsave: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditCustomer, getCustomerList } = get();
    const payload = {
      name: createEditCustomer.name,
      email_id: createEditCustomer.email_id,
      contact_number: createEditCustomer.contact_number,
      company_name: createEditCustomer.company_name,
      address_line: createEditCustomer.address_line,
      city: createEditCustomer.city,
      state: createEditCustomer.state,
      country: createEditCustomer.country.name,
      pincode: createEditCustomer.pincode,
    };

    httpRequest('post', `${envConfig.api_url}/pasm/customer/create`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Customer Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ addsave: false });
        getCustomerList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditCustomer: { ...data } }));
  },
  editCustomer: () => {
    set({ editsave: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditCustomer, getCustomerList } = get();
    const payload = {
      name: createEditCustomer.name,
      email_id: createEditCustomer.email_id,
      contact_number: createEditCustomer.contact_number,
      company_name: createEditCustomer.company_name,
      address_line: createEditCustomer.address_line,
      city: createEditCustomer.city,
      state: createEditCustomer.state,
      country: 'india',
      pincode: createEditCustomer.pincode,
      customer_id: createEditCustomer.id,
      address_id: createEditCustomer.address_id,
    };

    httpRequest('put', `${envConfig.api_url}/pasm/customer/update`, convertKeysToCamelCase(payload), true, undefined, {
      headers: { slug: slugId },
    })
      .then((response) => {
        enqueueSnackbar('Customers Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ editsave: false });
        getCustomerList();
      });
  },
  deleteCustomer: (id: string) => {
    set({ deletefetch: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getCustomerList } = get();
    const payload = {
      customer_id: id,
    };
    httpRequest(
      'delete',
      `${envConfig.api_url}/pasm/customer/delete`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      { headers: { slug: slugId } },
    )
      .then((response) => {
        enqueueSnackbar('Customers Deleted Succesfully!', { variant: 'success' });
        // set({ FeatureList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ deletefetch: false });
        getCustomerList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getCustomerList } = get();
    const payload = {
      customer_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/pasm/customer/update`, convertKeysToCamelCase(payload), true, undefined, {
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
        getCustomerList();
      });
  },
  clearAll: () => {
    set({
      createEditCustomer: {
        name: '',
        email_id: '',
        contact_number: '',
        company_name: '',
        address_line: '',
        city: '',
        state: '',
        country: '',
        pincode: 0,
        id: '',
        address_id: '',
      },
    });
  },
}));
