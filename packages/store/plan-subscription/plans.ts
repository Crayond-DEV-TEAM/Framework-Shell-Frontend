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
    is_plan_public: false,
    is_recomended: false,
    is_metered_billing: false,
    is_active: false,
    billing_period: [],
    price: {
      monthly: 0,
      yearly: 0,
    },
    is_per_user: false,
    is_flat_fee: false,
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
  planUngroupedFeature: [],
  planAddOn: [],
  planCharge: [],
  deleteAddOn: [],
  deleteCharge: [],
  deleteFeature: [],
  deleteGroupFeature: [],

  featureList: [],
  ungroupedFeatureList: [],
  addons: [],
  charges: [],
  optionsfeatureList: [],
  optionsungroupedFeatureList: [],
  optionsaddons: [],
  optionscharges: [],

  fetching: false,
  errorOnFetch: false,

  setFeatureList: (x: any) => {
    set(() => ({ featureList: x }));
  },
  setUnGroupedFeatureList: (x: any) => {
    set(() => ({ ungroupedFeatureList: x }));
  },
  setAddOns: (x: any) => {
    set(() => ({ addons: x }));
  },
  setCharges: (x: any) => {
    set(() => ({ charges: x }));
  },
  setOptionsFeatureList: (x: any) => {
    set(() => ({ optionsfeatureList: x }));
  },
  setOptionsUngroupedFeatureList: (x: any) => {
    set(() => ({ optionsungroupedFeatureList: x }));
  },
  setOptionsAddons: (x: any) => {
    set(() => ({ optionsaddons: x }));
  },
  setOptionsCharges: (x: any) => {
    set(() => ({ optionscharges: x }));
  },

  clearAll: () => {
    set({
      PlanList: [],
      addEditPlan: {
        name: '',
        description: '',
        is_plan_public: false,
        is_recomended: false,
        is_metered_billing: false,
        is_active: false,
        billing_period: [],
        price: {
          monthly: 0,
          yearly: 0,
        },
        is_per_user: false,
        is_flat_fee: false,
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
      planUngroupedFeature: [],
      planAddOn: [],
      planCharge: [],
      deleteAddOn: [],
      deleteCharge: [],
      deleteFeature: [],
      deleteGroupFeature: [],

      featureList: [],
      ungroupedFeatureList: [],
      addons: [],
      charges: [],
      optionsfeatureList: [],
      optionsungroupedFeatureList: [],
      optionsaddons: [],
      optionscharges: [],
    });
  },

  getPayload: () => {
    const { PlanList, addEditPlan, planAddOn, planFeature, planUngroupedFeature, planCharge, getPlansList } = get();

    // const { RepositoryList } = useRepository();
    const grp_feature = planFeature.map((x: any) => {
      return x.feature.map((ftr: any) => {
        return {
          feature_id: ftr.id,
          limit_count: ftr.limit_count,
          feature_group_id: x.id,
          plan_feature_mapping_id: x?.plan_feature_mapping_id || null,
        };
      });
    });

    const ungroup = planUngroupedFeature.map((x) => {
      return {
        feature_id: x.id,
        limit_count: x.limit_count || 0,
        plan_feature_mapping_id: x?.plan_feature_mapping_id || null,
        // feature_group_id: null,
      };
    });

    const data = addEditPlan;
    const temp_feature: any[] = ungroup;
    temp_feature.push(grp_feature.flat());
    data.feature = temp_feature.flat();

    data.add_on = planAddOn;
    data.charge = planCharge;

    return data;
  },

  setDeleteAddon: (id: string) => {
    const { deleteAddOn } = get();
    const data: any = deleteAddOn;
    data.push(id);
    set(() => ({ deleteAddOn: data }));
  },

  setDeleteCharges: (id: string) => {
    const { deleteCharge } = get();
    const data: any = deleteCharge;
    data.push(id);
    set(() => ({ deleteCharge: data }));
  },

  setDeleteFeatures: (id: string) => {
    const { deleteFeature } = get();
    const data: any = deleteFeature;
    data.push(id);
    set(() => ({ deleteFeature: data }));
  },

  setDeleteGroupFeature: (id: string) => {
    const { deleteGroupFeature } = get();
    const data: any = deleteGroupFeature;
    data.push(id);
    set(() => ({ deleteGroupFeature: data }));
  },

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

  setBulkPlanList: (obj: any) => {
    set((state) => ({ addEditPlan: { ...state.addEditPlan, ...obj } }));
  },

  setPlanFeature: (groups: any, _value: any) => {
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
          user_value: count > 0 ? 'limited' : 'unlimited',
        });
      });
      return result.push({
        id: group.id,
        name: group.name,
        feature: data,
      });
    });

    // console.log(data);

    set((_state) => {
      return {
        planFeature: result,
      };
    });
  },

  setExplicitPlanFeature: (group: any) => {
    set((_state) => ({
      planFeature: group,
    }));
  },

  setAddOn: (value: any) => {
    set((state) => ({
      planAddOn: value,
    }));
  },

  setCharge: (value: any) => {
    set((state) => ({
      planCharge: value,
    }));
  },

  setUngroupedFeature: (value: any) => {
    set((state) => ({
      planUngroupedFeature: value,
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
            activesubscription: x.subscriptions.length.toString() | 0,
            lastmodified: `${new Date(x.updated_at).getDate()} /
              ${new Date(x.updated_at).getMonth()} /
              ${new Date(x.updated_at).getFullYear()}`,
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
  addPlan: () => {
    const { getPayload, getPlansList } = get();

    set({ fetching: true, errorOnFetch: false });
    const data: any = getPayload();
    const payload = {
      ...data,
    };

    httpRequest('post', `${envConfig.api_url}/plans/create`, payload, true)
      .then((_response) => {
        enqueueSnackbar('Plan added Succesfully!', { variant: 'success' });
      })
      .catch((_err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 10 });
      });
  },
  editPlan: () => {
    const {
      PlanList,
      addEditPlan,
      deleteAddOn,
      deleteCharge,
      deleteFeature,
      deleteGroupFeature,
      getPlansList,
      getPayload,
    } = get();

    set({ fetching: true, errorOnFetch: false });
    const data: any = getPayload();
    data.deleted_charges = deleteCharge;
    data.deleted_add_ons = deleteAddOn;
    data.deleted_features = deleteFeature;
    console.log(data);
    const payload = {
      ...data,
    };

    httpRequest('put', `${envConfig.api_url}/plans`, payload, true)
      .then((_response) => {
        enqueueSnackbar('Plan Edited Succesfully!', { variant: 'success' });
      })
      .catch((_err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 10 });
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
      .then((_response) => {
        enqueueSnackbar('Plan Deleted Succesfully!', { variant: 'success' });
      })
      .catch((_err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetch: true });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 10 });
      });
  },
  editPlanStatus: (id: any, status: any) => {
    set({ fetching: true, errorOnFetch: false });
    const { getPlansList } = get();
    const payload = {
      plan_id: id,
      is_active: status,
    };

    httpRequest('put', `${envConfig.api_url}/plans`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status updated Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetch: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getPlansList({ offset: 0, limit: 10 });
      });
  },
}));
