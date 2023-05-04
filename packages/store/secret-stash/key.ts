import { log } from '@core/logger';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { KeyInterface } from '../interface';
import { giveMeKeyState } from '../utils';
export const useKeys = create<KeyInterface>((set, get) => ({
  editKey: giveMeKeyState(),
  keys: [],
  openKey: false,
  isEditKey: false,
  keyFetching: false,
  errorOnKeyFetching: false,

  getKeys: async (environment: any, slug: string) => {
    const { keys } = get();
    return new Promise((resolve, reject) => {
      try {
        httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/my/keys`,
          {
            environment: environment?.name ?? '',
            slug: slug ?? '',
            offset: 0,
            limit: 10,
          },
          true,
        )
          .then((response) => {
            if (response?.data?.status === 200) {
              const tempRow = response?.data?.response?.rows?.map((e: any) => {
                return {
                  ...e,
                  password: e?.value,
                };
              });
              console.log(tempRow, 'tempRow');

              set((state) => {
                return {
                  keys: {
                    ...state.keys,
                    data: response?.data?.response?.rows,
                  },
                };
              });
              resolve(response?.data);
            } else {
              throw new Error('Internal Server Error');
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err: any) {
        log('error', err);
        const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
        enqueueSnackbar('keys errror', { variant: 'error' });
      }
    });
  },

  validate: (state: any) => {
    let isValid = true;
    // debugger
    const passwordRegex = /^[a-zA-Z0-9_]{1,}$/;
    const error = state?.data?.error;
    if (state?.data?.name?.length === 0) {
      isValid = false;
      error.name = 'Name required';
    } else {
      error.name = '';
    }
    if (state?.data?.value?.length === 0) {
      isValid = false;
      error.value = 'value required';
    } else if (passwordRegex.test(state?.data?.value) === false) {
      debugger
      isValid = false;
      error.value = 'Please give valid value';
    } else {
      error.value = '';
    }
    return { isValid, error };
  },

  addKeys: async (e: any, slug: string, environment: any) => {
    const { handleKeyDrawerClose, editKey, validate } = get();
    const { isValid, error } = validate(editKey);
    debugger
    if (!isValid) {
      set((state) => ({ editKey: { ...state.editKey, error } }));
      return false;
    } else {
      try {
        // set({ loading: true });
        const response = await httpRequest(
          'post',
          `https://dev-secrethub-api.crayond.com/api/v1/service/add/key`,
          {
            environment: environment?.name,
            slug: slug,
            name: e?.name,
            value: e?.value,
          },
          true,
        );

        if (response.data?.status === 200) {
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          // set({ loading: false });
          handleKeyDrawerClose('');

          return response;
        }
      } catch (err: any) {
        // set({ loading: false });
        log('error', err);
        enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
      }
    }
  },

  editKeysAPI: async (e: any, slug: string, environment: object) => {
    const { handleKeyDrawerClose } = get();
    debugger
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/update/key`,
        {
          slug: slug,
          name: e?.name,
          value: e?.value,
          id: e?.id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response?.data?.message ?? 'key updated successfully', { variant: 'success' });
        // set({ loading: false });
        handleKeyDrawerClose('');
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  handleDeleteKey: async (id: string) => {
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/remove/key`,
        {
          id: id,
        },
        true,
      );
      debugger
      if (response?.data?.status === 200) {
        enqueueSnackbar(response?.data?.message ?? 'Env downloaded successfully', { variant: 'success' });
        // set({ loading: false });

        return response?.data;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },
  handleDownloadEnv: async (slug: string, environment: string) => {
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/download/env`,
        {
          slug: slug,
          environment: environment,
        },
        true,
      );
      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message ?? 'Env downloaded successfully', { variant: 'success' });
        // set({ loading: false });
        console.log(response, ' response');

        return response?.data;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  downloadTextAsFile: (text: any, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  handleKeyDrawerOpen: () => {
    set({ openKey: true });
  },

  handleKeyDrawerClose: () => {
    const { openKey, editKey, isEditKey } = get();
    set({ openKey: false, editKey: giveMeKeyState(), isEditKey: false });
  },

  addFileAPI: async (formdata: any) => {
    try {
      // set({ loading: true });
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/upload/env`,
        formdata,
        true,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.response, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  singleFileUpload: async (file: File): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const allowed_image_size = 5;
        const file_type = file?.type.split('/')?.[0];
        const bytes = file?.size;
        const finalSize = Number((bytes / (1024 * 1024)).toFixed(2));
        if (finalSize <= allowed_image_size) {
          resolve(true);
        } else {
          enqueueSnackbar('Please upload less than 5 MB file', {
            variant: 'error',
          });
          resolve(false);
        }
      } catch (error) {
        enqueueSnackbar('Something Went Wrong', {
          variant: 'error',
        });
        resolve(false);
      }
    });
  },

  handleUploadFile: async (e: any, slug: string, environment: string) => {
    const { singleFileUpload, getKeys, addFileAPI } = get();
    if (e?.target?.files) {
      const res = await singleFileUpload(e.target.files[0]);
      if (res === true) {
        const formData = new FormData();
        formData.append('file', e?.target?.files[0]);
        formData.append('slug', slug);
        formData.append('environment', environment);

        await addFileAPI(formData);
      }
    }
  },

  handleKeyChange: (key: string, value: any) => {
    const { editKey } = get();
    const error = editKey?.data?.error;
    error[key] = '';
    set((state) => {
      return {
        editKey: {
          ...state.editKey,
          data: {
            ...state.editKey.data,
            [key]: value,
            error,
          },
        },
      };
    });
  },

  handleTableEdit: (e: any) => {
    const { openKey, keys, handleKeyDrawerOpen, editKey } = get();
    set({ isEditKey: true });
    const filterKey = keys?.data?.find((x: object) => x?.id === e);
    handleKeyDrawerOpen('');
    // set({ editKey: filterKey });
    set((state) => {
      return {
        editKey: {
          ...state?.editKey,
          data: {
            error: state?.editKey?.data?.error,
            ...filterKey,
          },
        },
      };
    });
  },

  onSaveKeys: async (e: any, slug: string, environment: any) => {
    const { isEditKey, editKeysAPI, getKeys, addKeys } = get();
    if (isEditKey) {
      await editKeysAPI(e, slug, environment);
      await getKeys(environment, slug);
    } else {
      await addKeys(e, slug, environment);
      await getKeys(environment, slug);
    }
  },
}));
