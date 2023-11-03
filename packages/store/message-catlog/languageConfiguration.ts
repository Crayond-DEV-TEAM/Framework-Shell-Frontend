import { create } from 'zustand';
import { LanguageConfigInterface, SelectBoxInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { useNavigate } from 'react-router-dom';
import { messageRoutes } from '@core/routes';

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
    httpRequest('get', `${envConfig.api_url}/message_catalog/display_Master_languages`, {}, true,
      undefined,
      {
        headers: {
          slug: 'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
        }
      })
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
    httpRequest('get', `${envConfig.api_url}/message_catalog/display_config_languages`, {}, true,
      undefined,
      {
        headers: {
          slug: 'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
        }
      },)
      .then((response) => {
        const { masterLanguages } = get();
        const newMasterLanguages = masterLanguages;
        const updateMasterLanguages = setInterval(() => {
          if (masterLanguages.length > 0) {
            masterLanguages.forEach((ml, index) => {
              response.data.data?.map((rdd: any) => {
                if (ml.value === rdd.language_id) {
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
          const newLang = { configuration_id: lang.id, ...lang.language, is_default: lang.is_default };
          newLanguages.push(newLang);
          if (lang.is_default) {
            newDefaultLang = newLang;
          }
        });

        set({
          languages: newLanguages,
          defaultLang: newDefaultLang,
        });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        // enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },
  saveLanguage: () => {
    const { languages } = get();
    set({ saving: true, errorOnSaving: false });
    httpRequest('put', `${envConfig.api_url}/message_catalog/edit_config_languages`, { languages },
      true,
      undefined,
      {
        headers: {
          slug: 'bde5b3fe-7af1-4cc3-9a6e-5e4af2c416a3'
        }
      })
      .then((response) => {
        set({ isSaved: true, message: 'Changes Saved!' });

        setTimeout(() => {
          set({ message: '' });
        }, 5000);

        // enqueueSnackbar(`Language Configuration Updated`, { variant: 'success' });
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
      setTimeout(() => {
        set({ message: '' });
      }, 5000);

      // enqueueSnackbar('Language added successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar('Language already added!', { variant: 'warning' });
    }

    return true;
  },
  deleteLanguage: (lang: SelectBoxInterface | null, index: number | null) => {
    set((state) => {
      const newLanguages = state.languages;
      newLanguages.splice(index as number, 1);
      const newMasterLanguages = state.masterLanguages;
      newMasterLanguages.push(lang as SelectBoxInterface);
      newMasterLanguages.sort((a: any, b: any) => b.label - a.label);
      return {
        languages: newLanguages,
        masterLanguages: newMasterLanguages,
        isSaved: false,
        message: "Changes will be lost if you don't save.",
      };
    });
    setTimeout(() => {
      set({ message: '' });
    }, 5000);

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
    setTimeout(() => {
      set({ message: '' });
    }, 5000);

    set({ defaultLang: lang, isSaved: false, message: "Changes will be lost if you don't save." });
    return true;
  },
}));
