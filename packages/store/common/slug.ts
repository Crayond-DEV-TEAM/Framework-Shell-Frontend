import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes, messageRoutes } from '@core/routes';
import { httpRequest, routeTo } from '@core/utils';
import { useRouting } from '../common';
import { create } from 'zustand';
import { Menu, MenusProps, SlugProps } from '../interface';
import { AllRoutes } from '../utils';
import { enqueueSnackbar } from 'notistack';
import { produce } from "immer"

export const useSlug = create<SlugProps>((set, get) => ({
  slugs: {
    IDM: '',
    PASM: '',
    ALERTSHUB: '',
    'MESSAGE-CATALOG': '',
  },

  setSlug: (key, value) => {
    const { slugs } = get();

    const latestState = produce(slugs, (draftState) => {
      if (draftState?.[key]) {
        draftState[key] = value
      }
    })

    set({ slugs: latestState })
  },

  getSlug: (key) => {
    const { slugs } = get();
    return slugs?.[key] ?? '';
  },
}));
