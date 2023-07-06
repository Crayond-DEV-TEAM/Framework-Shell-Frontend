import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { FeatureInterface, SubscriptionInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { dateFetching } from './commonFunction';
import { enqueueSnackbar } from 'notistack';
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
      debugger;
      const chargeMaps = createEditSubscription.plan_id.plan_charge_mappings?.map((value: any) => value.price);
      const Chargessum = chargeMaps?.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);

      const monthlyTotal = Array.isArray(createEditSubscription.add_on)
        ? createEditSubscription.add_on.reduce((accumulator: number, obj: any) => {
            const monthlyPrice =
              createEditSubscription.billing_type.name === 'Monthly'
                ? obj?.price?.monthly
                : createEditSubscription.billing_type.name === 'Yearly'
                ? obj?.price?.yearly
                : null;
            return accumulator + (monthlyPrice || 0);
          }, 0)
        : 0;
      const billingType = createEditSubscription?.billing_type?.name;
      const planCardPrice =
        billingType === 'Monthly'
          ? createEditSubscription.plan_id?.price?.monthly
          : billingType === 'Yearly'
          ? createEditSubscription.plan_id?.price?.yearly
          : null;

      const Total = monthlyTotal + parseInt(planCardPrice, 10) + Chargessum;
      return Total;
    };
    if (key === 'add_on') {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        createEditSubscription.add_on.push(value);
        totalCountFunc();
        // debugger;
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
        createEditSubscription.new_addon.push(value);
        // debugger;
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
        createEditSubscription.old_addon.push(value);
        // debugger;
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
    //   console.log(dateString);
    //   return dateString;
    // };

    set((state) => ({
      createEditSubscription: { ...state.createEditSubscription, [key]: value, actual_price: totalCountFunc() },
    }));
  },

  getSubscriptionList: () => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 100,
    };
    httpRequest('post', `${envConfig.api_url}/subscriptions`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                customerid: tableData.customer.alias_id,
                companyName: tableData.customer.company_name,
                adminname: tableData.customer.name,
                email: tableData.customer.email_id,
                data: tableData,
                currentplan: [
                  {
                    label: tableData.plan.name,
                    color: '#305AAE',
                    bgColor: '#E2EAFA',
                  },
                ],
                revenue: tableData.subscription_billings?.[0]?.actual_price,
                is_active: tableData.is_active,
                id: tableData.id,
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
    const { createEditSubscription, getSubscriptionList, clearAll } = get();
    const payload = {
      customer_id: createEditSubscription.customer_id,
      plan_id: createEditSubscription.plan_id.id,
      is_active: false,
      add_on: createEditSubscription.add_on.map((x) => ({
        id: x.add_on.id,
        price: {
          monthly: x.price.monthly,
          yearly: x.price.yearly,
        },
      })),
      billing: {
        billing_type: createEditSubscription.billing_type.name,
        actual_price: createEditSubscription.actual_price,
        price_paid: createEditSubscription.price_paid,
      },
      is_plan_effective: createEditSubscription.is_plan_effective,
      plan_effective_from: dateFetching(createEditSubscription.plan_effective_from),
    };

    httpRequest('post', `${envConfig.api_url}/subscriptions/create`, payload, true)
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
    const { createEditSubscription, getSubscriptionList, clearAll } = get();
    const newAddOn = createEditSubscription.new_addon?.map((x) => x.add_on.id) || [];
    const oldAddOn = createEditSubscription.old_addon?.map((x) => x.add_on.id) || [];
    const payload = {
      subscription_id: createEditSubscription.id,
      customer_id: createEditSubscription.customer_id,
      plan_id: createEditSubscription.plan_id.id,
      is_active: false,
      new_add_on: createEditSubscription.new_add_on.map((x) => ({
        id: x.add_on.id,
        price: {
          monthly: x.price.monthly,
          yearly: x.price.yearly,
        },
      })),
      // new_add_on: newAddOn,
      deleted_add_on: createEditSubscription.old_addon.map((x) => ({
        id: x.add_on.id,
        price: {
          monthly: x.price.monthly,
          yearly: x.price.yearly,
        },
      })),
      billing: {
        billing_type: createEditSubscription.billing_type?.name,
        actual_price: createEditSubscription.actual_price,
        price_paid: createEditSubscription.price_paid,
      },
      is_plan_effective: createEditSubscription.is_plan_effective,
      plan_effective_from: dateFetching(createEditSubscription.plan_effective_from),
    };

    httpRequest('put', `${envConfig.api_url}/subscriptions`, payload, true)
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
    const { getSubscriptionList } = get();
    const payload = {
      subscription_id: id,
    };
    httpRequest('delete', `${envConfig.api_url}/subscriptions`, payload, true)
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
    const payload = {
      customer_id: id,
    };
    httpRequest('post', `${envConfig.api_url}/subscriptions/customerSubscription`, payload, true)
      .then((response) => {
        debugger;
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
    const { getSubscriptionList } = get();
    const payload = {
      subscription_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/subscriptions`, payload, true)
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
