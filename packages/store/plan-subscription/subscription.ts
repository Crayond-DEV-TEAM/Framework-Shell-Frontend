import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { FeatureInterface, SubscriptionInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { dateFetching } from './commonFunction';
import { enqueueSnackbar } from 'notistack';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '@core/utils/helperFunctions';
import { useSlug } from '../common';
// import { tableJson } from '@components/feature/utils'

export const useSubscription = create<SubscriptionInterface>((set, get) => ({
  SubscriptionList: [],

  fetching: false,
  errorOnFetching: false,
  addsave: false,
  editsave: false,
  deletefetch: false,
  OldSubscription: [],
  TicketSubscription: [],

  createEditSubscription: {
    customer_id: '',
    plan_id: '',
    is_active: false,
    add_on: [],
    billing_type: '',
    actual_price: 0,
    price_paid: 0,
    old_addon: [],
    new_addon: [],
    id: '',
    is_plan_effective: false,
  },

  setTicketSubscription: (value: any) => {
    set((state) => ({ TicketSubscription: value }));
  },

  setSubscriptionList: (key: string, value: any) => {
    const { createEditSubscription } = get();
    const totalCountFunc = () => {
      const chargeMaps = createEditSubscription?.plan_id?.plan_charge_mappings?.map((value: any) => value?.price);
      const Chargessum = chargeMaps?.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);

      const monthlyTotal = Array.isArray(createEditSubscription?.add_on)
        ? createEditSubscription?.add_on?.reduce((accumulator: number, obj: any) => {
            const monthlyPrice =
              createEditSubscription?.billing_type?.name === 'Monthly'
                ? obj?.price?.monthly
                : createEditSubscription?.billing_type?.name === 'Yearly'
                ? obj?.price?.yearly
                : null;
            return accumulator + (monthlyPrice || 0);
          }, 0)
        : 0;
      const billingType = createEditSubscription?.billing_type?.name;
      const planCardPrice =
        billingType === 'Monthly'
          ? createEditSubscription?.plan_id?.price?.monthly
          : billingType === 'Yearly'
          ? createEditSubscription?.plan_id?.price?.yearly
          : null;
      const Total = monthlyTotal + parseInt(planCardPrice, 10) + (Chargessum === undefined ? 0 : Chargessum);
      return Total;
    };
    if (key === 'add_on') {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        createEditSubscription?.add_on?.push(value);
        totalCountFunc();
        return set((state) => ({
          createEditSubscription: {
            ...state.createEditSubscription,
            actual_price: totalCountFunc(),
          },
        }));
      } else {
        set((state) => ({
          createEditSubscription: { ...state.createEditSubscription, [key]: value, actual_price: totalCountFunc() },
        }));
      }
    }
    if (key === 'new_addon') {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        createEditSubscription?.new_addon.push(value);
        return set((state) => ({
          createEditSubscription: {
            ...state.createEditSubscription,
          },
        }));
      } else {
        set((state) => ({
          createEditSubscription: { ...state.createEditSubscription, [key]: value },
        }));
      }
    }
    if (key === 'old_addon') {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        createEditSubscription?.old_addon.push(value);
        return set((state) => ({
          createEditSubscription: {
            ...state.createEditSubscription,
          },
        }));
      } else {
        set((state) => ({
          createEditSubscription: { ...state.createEditSubscription, [key]: value },
        }));
      }
    }

    // const dateFetching = () => {
    //   const currentDate = new Date();
    //   const dateString = currentDate.toISOString();
    //   return dateString;
    // };

    set((state) => ({
      createEditSubscription: { ...state.createEditSubscription, [key]: value, actual_price: totalCountFunc() },
    }));
  },

  getSubscriptionList: () => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const payload = {
      offset: 0,
      limit: 100,
    };
    httpRequest(
      'post',
      `${envConfig.api_url}/pasm/subscription/get`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          convertKeysToSnakeCase(response.data.data.rows).map(
            (tableData: any, i: any) =>
              dataTable.push({
                customerid: tableData?.customer?.alias_id,
                companyName: tableData?.customer?.company_name,
                adminname: tableData?.customer?.name,
                email: tableData?.customer?.email_id,
                data: tableData,
                currentplan: [
                  {
                    label: tableData?.plan?.name,
                    color: '#305AAE',
                    bgColor: '#E2EAFA',
                  },
                ],
                revenue: tableData?.subscription_billings?.[0]?.actual_price,
                is_active: tableData?.is_active,
                id: tableData?.id,
              }),
            set({ SubscriptionList: dataTable }),
          );
        } else {
          set({ SubscriptionList: [] });
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
  createSubscription: () => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditSubscription, getSubscriptionList, clearAll } = get();
    
    const payload = {
      customer_id: createEditSubscription?.customer_id,
      plan_id: createEditSubscription?.plan_id?.id,
      is_active: false,
      add_on: createEditSubscription.add_on.map((x: any) => ({
        id: x.add_on.id,
        price: {
          monthly: x.price.monthly,
          yearly: x.price.yearly,
        },
      })),
      billing: {
        billing_type: createEditSubscription?.billing_type?.name,
        actual_price: createEditSubscription?.actual_price,
        price_paid: createEditSubscription?.price_paid,
      },
      is_plan_effective: createEditSubscription?.is_plan_effective,
      plan_effective_from: dateFetching(createEditSubscription?.is_plan_effective,createEditSubscription?.billing_type?.name),
    };

    httpRequest(
      'post',
      `${envConfig.api_url}/pasm/subscription/create`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Feature Created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSubscriptionList();
        clearAll();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditSubscription: { ...data } }));
  },
  editSubscription: () => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { createEditSubscription, getSubscriptionList, clearAll } = get();
    const newAddOn = createEditSubscription?.new_addon?.map((x) => x?.add_on?.id) || [];
    const oldAddOn = createEditSubscription?.old_addon?.map((x) => x?.add_on?.id) || [];
    const payload = {
      subscription_id: createEditSubscription?.id,
      customer_id: createEditSubscription?.customer_id,
      plan_id: createEditSubscription?.plan_id?.id,
      is_active: createEditSubscription?.is_active,
      new_add_on: createEditSubscription.new_addon.map((x) => ({
        id: x.add_on.id,
        price: {
          monthly: x.price?.monthly,
          yearly: x.price?.yearly,
        },
      })),
      deleted_add_on: oldAddOn,
      billing: {
        billing_type: createEditSubscription?.billing_type?.name,
        actual_price: createEditSubscription?.actual_price,
        price_paid: createEditSubscription?.price_paid,
      },
      is_plan_effective: createEditSubscription?.is_plan_effective,
      plan_effective_from: dateFetching(createEditSubscription?.plan_effective_from),
    };

    httpRequest(
      'put',
      `${envConfig.api_url}/pasm/subscription/update`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Feature Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSubscriptionList();
        clearAll();
      });
  },
  deleteSubscription: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getSubscriptionList } = get();
    const payload = {
      subscription_id: id,
    };
    httpRequest(
      'delete',
      `${envConfig.api_url}/pasm/subscription/delete`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Feature Deleted Succesfully!', { variant: 'success' });
        // set({ SubscriptionList: response.data.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSubscriptionList();
      });
  },
  fetchSubscription: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const payload = {
      customer_id: id,
    };
    httpRequest(
      'post',
      `${envConfig.api_url}/pasm/customersubscription/get`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        set({ OldSubscription: response.data.data.rows?.slice(-1)[0] });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        // getSubscriptionList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const slugId = useSlug?.getState()?.slugs?.PASM;
    const { getSubscriptionList } = get();
    const payload = {
      subscription_id: id,
      is_active: status,
    };

    httpRequest(
      'put',
      `${envConfig.api_url}/pasm/subscription/update`,
      convertKeysToCamelCase(payload),
      true,
      undefined,
      {
        headers: { slug: slugId },
      },
    )
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSubscriptionList();
      });
  },
  clearAll: () => {
    set({
      createEditSubscription: {
        customer_id: '',
        plan_id: '',
        is_active: false,
        add_on: [],
        old_addon: [],
        new_addon: [],
        billing_type: '',
        actual_price: 0,
        price_paid: 0,
        id: '',
        is_plan_effective: false,
      },
    });
  },
}));
