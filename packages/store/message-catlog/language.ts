import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, queryClient, routeTo, ValidateEmail } from '@core/utils';
import { filterContent, localStorageKeys } from '@core/utils/constants';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

export interface LanguageProps {
  langState: any;
  selectedState: any;
  addedLangState: any;
  savelangState: any;
  statusState: any;
  dropState: any;
  topState: any;
  loading: boolean;
  handleGroupChange: (key: string, value: any) => void;
  handleLanguageChange: (data: any) => void;
  handleDropChange: (key: string, value: any) => void;
  handleChipDelete: (label: string, index: number, parentIndex: number) => void;
  languagedisplay: () => void;
  addedlanguagedisplay: (payload: any) => void;
  savelanguages: (payload: any) => void;
  responseState: any;
}

export const useLanguage = create<LanguageProps>((set, get) => ({
  langState: null,
  dropState: null,
  selectedState: null,
  addedLangState: null,
  savelangState: null,
  responseState: null,
  statusState: null,
  loading: false,
  topState: null,
  languageState: {
    languageData: [],
  },

  // handle Group Change
  handleGroupChange: (key: string, value: any) => {
    const { selectedState } = get();
    set({
      selectedState: {
        ...selectedState,
        [key]: value,
      },
    });
  },
  handleDropChange: (key: string, value: any) => {
    const { dropState } = get();
    set({
      dropState: {
        ...dropState,
        [key]: value,
      },
    });
  },

  // handle Chip Delete
  handleChipDelete: (label: string, index: number, parentIndex: number) => {
    const { langState } = get();
    langState.filterContent[parentIndex].children[index].value = false;
    set({
      langState: {
        ...langState,
      },
    });
  },

  handleLanguageChange: (data: any) => {
    const { addedLangState } = get();

    set({
      addedLangState: [...addedLangState, ...data],
    });
  },
  languagedisplay: async () => {
    try {
      const { langState } = get();
      set({ loading: true });
      // const { data, status } = await queryClient.fetchQuery({
      //   queryKey: ['masterLanguage'],
      //   queryFn: async () => {
      const { data } = await httpRequest(
        'get',
        `${envConfig.api_url}/config_languages/display_Master_languages`,
        {},
        true,
      );

      const arr = [];
      //     return data;
      //   },

      //   staleTime: 50000,
      // });
      set((state) => ({
        loading: false,
        langState: data?.data ?? [],
        statusState: status,
      }));

      return data?.data ?? [];
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },

  addedlanguagedisplay: async () => {
    try {
      const { addedLangState } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['addedLanguage'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'get',
            `${envConfig.api_url}/config_languages/display_config_languages`,
            {},
            true,
          );
          return data;
        },

        staleTime: 1000,
      });
      set((state) => ({
        loading: false,
        addedLangState: data,
      }));
      return data?.data ?? [];

      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },
  savelanguages: async (payload) => {
    try {
      const { savelangState } = get();
      set({ loading: true });
      const { data, status } = await queryClient.fetchQuery({
        queryKey: ['savelanguage'],
        queryFn: async () => {
          const { data } = await httpRequest(
            'post',
            `${envConfig.api_url}/config_languages/config_language`,
            {
              languages: [
                {
                  language: payload ?? '',
                  is_default: true,
                },
              ],
            },
            true,
          );

          return data;
        },

        staleTime: 1000,
      });
      return set((state) => ({
        loading: false,
        savelangState: data,
        responseState: status,
      }));

      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Something went wrong please try again!', { variant: 'error' });
    }
  },
}));
