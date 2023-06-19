import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { PlansInterface } from '../interface';
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
        id: '',
        price: 0,
      },
    ],
  },
  fetching: false,
  errorOnFetch: false,
  getPlansList: (x = { offset: 0, limit: 0 }) => {
    set({ fetching: true, errorOnFetch: false });

    const payload = {
      offset: x.offset,
      limit: x.limit,
    };

    httpRequest('post', `${envConfig.api_url}/plans/`, payload, true)
      .then((response) => {
        set({ PlanList: response.data.data });
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
      id: x,
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
