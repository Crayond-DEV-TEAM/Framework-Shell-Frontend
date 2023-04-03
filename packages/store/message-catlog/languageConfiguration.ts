import { create } from 'zustand';
import { LanguageConfigInterface, SelectBoxInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';

export const useLanguageConfiguration = create<LanguageConfigInterface>((set, get) => ({
  languages: [],
  masterLanguages: [],
  masterLanguageLoading: false,
  masterLanguageError: false,
  defaultLang: null,
  isSaved: true,
  saving: false,
  errorOnSaving: false,
  fetching: false,
  errorOnFetching: false,
  message: '',
  getAllLanguages: () => {
    set({ masterLanguageLoading: true, masterLanguageError: false });
    httpRequest('get', `${envConfig.api_url}/config_languages/display_Master_languages`, {}, true)
      .then((response) => {
        set({ masterLanguages: response.data });
      })
      .catch((err) => {
        set({ masterLanguageError: true });
        enqueueSnackbar(`Opps! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ masterLanguageLoading: false });
      });
    return false;
  },
  getSavedLanguage: () => {
    set({ fetching: false, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/config_languages/display_config_languages`, {}, true)
      .then((response) => {
        set({ languages: response.data });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Opps! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
  saveLanguage: () => {
    const { languages } = get();
    set({ saving: true, errorOnSaving: false });
    httpRequest('post', `${envConfig.api_url}/config_languages/config_language`, { languages }, true)
      .then((response) => {
        set({ isSaved: true });
        enqueueSnackbar(`Language Configuration Updated`, { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnSaving: true });
        enqueueSnackbar(`Opps! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ saving: false });
      });
    return false;
  },
  addLanguage: (lang: SelectBoxInterface) => {
    if (get().languages.filter((_) => _.value === lang.value).length > 0) {
      set((state) => ({
        languages: [...state.languages, lang],
        isSaved: false,
        message: "Changes will be lost if you don't save.",
      }));
      enqueueSnackbar('Language added successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar('Language already added!', { variant: 'warning' });
    }
    return true;
  },
  deleteLanguage: (lang: SelectBoxInterface, index: number) => {
    set((state) => {
      const newLanguages = state.languages;
      newLanguages.splice(index, 1);
      return { languages: newLanguages, isSaved: false, message: "Changes will be lost if you don't save." };
    });
    enqueueSnackbar('Language removed successfully!', { variant: 'success' });
    return true;
  },
  updateDefaultLang: (lang: SelectBoxInterface) => {
    set({ defaultLang: lang, isSaved: false, message: "Changes will be lost if you don't save." });
    set((state) => ({
      languages: state.languages.map((_) => {
        if (lang.value === _.value) {
          return { ..._, is_default: true };
        } else {
          return _;
        }
      }),
    }));
    return true;
  },
}));
