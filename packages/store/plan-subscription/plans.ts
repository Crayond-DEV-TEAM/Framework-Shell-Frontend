import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PlansInterface, Feature, AddEditPlans } from '../interface';
import { enqueueSnackbar } from 'notistack';

export const usePlans = create<PlansInterface>((set, get) => ({
  PlanList: [],
  addEditPlan: {
    name: '',
    description: '',
    is_plan_public: true,
    is_recomended: true,
    is_metered_billing: true,
    is_active: true,
    billing_period: [''],
    price: {
      monthly: 0,
      yearly: 0,
    },
    is_per_user: true,
    is_flat_fee: true,
    billing_cycles: '',
    feature: [
      {
        id: '',
        limit_count: '',
      },
    ],
    add_on: [
      {
        id: '',
        price: {
          monthly: 0,
          yearly: 0,
        },
        limit_count: 0,
      },
    ],
    charge: [
      {
        name: '',
        is_active: false,
        id: '',
        description: '',
      },
    ],
  },

  planFeature: [],
  planAddOn: [],
  fetching: false,
  errorOnFetch: false,

  setPlanList: (key: string, value: boolean | string, array_key = '') => {
    if (array_key.length > 0) {
      set((state) => ({
        // const temp_data = state.addEditPlan[array_key];
        addEditPlan: { ...state.addEditPlan, [array_key]: { ...state.addEditPlan[array_key], [key]: value } },
      }));
    } else {
      set((state) => ({ addEditPlan: { ...state.addEditPlan, [key]: value } }));
    }
  },

  setPlanFeature: (groups: any, value: any) => {
    let data: any = [];
    const result: any = [];
    let feature_data: any = {};
    const { planFeature } = get();
    groups.map((group: any) => {
      data = [];
      feature_data = planFeature?.find((z: any) => z.id === group.id) || {};
      group.feature_list.map((feature: any) => {
        const count = feature_data?.feature?.find((s: any) => s.id === feature.id)?.limit_count;
        console.log('count - ', count);
        data.push({
          id: feature.id,
          name: feature.name,
          limit_count: count || 0,
        });
      });
      return result.push({
        id: group.id,
        name: group.name,
        feature: data,
      });
    });

    // console.log(data);

    set((state) => {
      return {
        planFeature: result,
      };
    });
  },

  setExplicitPlanFeature: (group: any) => {
    set((state) => ({
      planFeature: group,
    }));
  },

  setAddOn: (value: any) => {
    set((state) => ({
      planAddOn: value,
    }));
  },

  getPlansList: (x = { offset: 0, limit: 0 }) => {
    set({ fetching: true, errorOnFetch: false });

    const payload = {
      offset: x.offset,
      limit: x.limit,
    };

    httpRequest('post', `${envConfig.api_url}/plans`, payload, true)
      .then((response) => {
        // console.log(response.data.data.rows)
        const result = response.data.data.rows.map((x: any) => {
          return {
            plan: x.name,
            billing: x.billing_period.join(),
            public: x.is_plan_public ? 'Yes' : 'No',
            activesubscriptions: x.active_subscriptions | 0,
            lastmodified: x.updated_at,
            status: x.is_active,
            id: x.id,
            plan_data: x,
          };
        });
        set({ PlanList: result });
      })
      .catch((_err) => {
        set({ errorOnFetch: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  addPlan: (data: any) => {
    const { PlanList, addEditPlan, getPlansList } = get();

    set({ fetching: true, errorOnFetch: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      ...data,
    };

    httpRequest('post', `${envConfig.api_url}/plans/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Plan added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 0 });
      });
  },
  editPlan: (data: any) => {
    const { PlanList, addEditPlan, getPlansList } = get();

    set({ fetching: true, errorOnFetch: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      ...data,
    };

    httpRequest('put', `${envConfig.api_url}/plans`, payload, true)
      .then((response) => {
        enqueueSnackbar('Plan Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 0 });
      });
  },
  deletePlan: (x: any) => {
    const { PlanList, addEditPlan, getPlansList } = get();
    console.log(x);
    set({ fetching: true, errorOnFetch: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      plan_id: x,
    };

    httpRequest('delete', `${envConfig.api_url}/plans`, payload, true)
      .then((response) => {
        enqueueSnackbar('Plan Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 0 });
      });
  },
}));
