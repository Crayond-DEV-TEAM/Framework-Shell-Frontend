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
        set({ masterLanguages: response.data.data?.sort((a: any, b: any) => b.label - a.label) });
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
        const { masterLanguages } = get();
        const newMasterLanguages = masterLanguages;
        const updateMasterLanguages = setInterval(() => {
          if (masterLanguages.length > 0) {
            masterLanguages.forEach((ml, index) => {
              response.data.data?.map((rdd: any) => {
                if (ml.value === rdd.value) {
                  newMasterLanguages.splice(index, 1);
                }
              });
            });
            set({ masterLanguages: newMasterLanguages });
            clearInterval(updateMasterLanguages);
          }
        }, 1000);

        let newDefaultLang: SelectBoxInterface | null = null;
        const newLanguages: SelectBoxInterface[] = [];

        response.data.data.forEach((lang: any) => {
          newLanguages.push({ ...lang.language, is_default: lang.is_default });
          if (lang.is_default) {
            newDefaultLang = lang;
          }
        });

        set({
          languages: newLanguages,
          defaultLang: newDefaultLang,
        });
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
    httpRequest('put', `${envConfig.api_url}/config_languages/edit_config_languages`, { languages }, true)
      .then((response) => {
        set({ isSaved: true, message: 'Changes Saved!' });
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
  addLanguage: (lang: SelectBoxInterface, index: number) => {
    if (get().languages.filter((_) => _.value === lang.value).length === 0) {
      set((state) => {
        const newMasterLanguages = state.masterLanguages;
        newMasterLanguages.splice(index, 1);
        return {
          languages: [...state.languages, lang],
          isSaved: false,
          message: "Changes will be lost if you don't save.",
          defaultLang: state.languages.length === 0 ? lang : state.defaultLang,
          masterLanguages: newMasterLanguages,
        };
      });
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
      const newMasterLanguages = state.masterLanguages;
      newMasterLanguages.push(lang);
      newMasterLanguages.sort((a: any, b: any) => b.label - a.label);
      return {
        languages: newLanguages,
        masterLanguages: newMasterLanguages,
        isSaved: false,
        message: "Changes will be lost if you don't save.",
      };
    });
    enqueueSnackbar('Language removed successfully!', { variant: 'success' });
    return true;
  },
  updateDefaultLang: (lang: SelectBoxInterface, index: number) => {
    set((state) => {
      const newLanguages = state.languages.map((_) => ({ ..._, is_default: false }));
      newLanguages[index].is_default = true;
      return {
        languages: newLanguages,
        defaultLang: lang,
        isSaved: false,
        message: "Changes will be lost if you don't save.",
      };
    });
    set({ defaultLang: lang, isSaved: false, message: "Changes will be lost if you don't save." });
    return true;
  },
}));
