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
    debugger
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
            console.log(response);
            if (response?.data?.status === 200) {
              // debugger
              // console.log(response?.data?.response?.rows, '');
              const tempRow = response?.data?.response?.rows?.map((e: any) => {

                return {
                  ...e,
                  password: e?.value
                }
              })
              debugger
              set({ keys: tempRow });

              // enqueueSnackbar('keys listed', { variant: 'success' });
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

  addKeys: async (e: any, slug: string, environment: any) => {
    const { editKey } = get();
    try {
      // set({ loading: true });
      debugger;
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
        enqueueSnackbar(response.data.message, { variant: 'success' });
        // set({ loading: false });
        return response;
      }
    } catch (err: any) {
      // set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while adding Key!', { variant: 'error' });
    }
  },

  editKeysAPI: async (e: any, slug: string, environment: string) => {
    const { handleKeyDrawerClose } = get();
    try {
      // set({ loading: true });
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/update/key`,
        {
          slug: slug,
          name: e?.name,
          value: e?.value,
          id: environment?.id,
        },
        true,
      );

      if (response.data?.status === 200) {
        enqueueSnackbar(response.data.message ?? 'key updated successfully', { variant: 'success' });
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
      debugger;
      const response = await httpRequest(
        'post',
        `https://dev-secrethub-api.crayond.com/api/v1/service/upload/env`,
        formdata,
        true,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },

        // 'Content-Type': 'multipart/form-data'
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
    return new Promise<boolean>(async (resolve, reject) => {
      debugger;
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
    const { singleFileUpload } = get();
    const { addFileAPI } = get();
    debugger;
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
    // debugger;
    set((prevstate) => ({ editKey: { ...prevstate.editKey, [key]: value } }));
  },

  handleTableEdit: (e: any) => {
    const { openKey, keys, handleKeyDrawerOpen } = get();
    debugger;
    set({ isEditKey: true });
    const filterKey = keys.find((x) => x?.id === e);
    handleKeyDrawerOpen('');
    set({ editKey: filterKey });
  },

  onSaveKeys: async (e: any, slug: string, environment: any) => {
    debugger;
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
