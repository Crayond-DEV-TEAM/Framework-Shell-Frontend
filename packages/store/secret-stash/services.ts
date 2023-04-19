import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import { dummyServicesData, giveMeServicesInitialState } from '../utils';

export const useServices = create<ServiceInterface>((set, get) => ({
  services: [],
  editServices: giveMeServicesInitialState(),

  fetching: false,
  errorOnFetching: false,

  getServices: () => {
    set({ services: dummyServicesData });
  },

  setEditServicesfn: (key, value) => {
    debugger;
    set((state) => ({ editServices: { ...state.editServices, [key]: value } }));
  },
}));
