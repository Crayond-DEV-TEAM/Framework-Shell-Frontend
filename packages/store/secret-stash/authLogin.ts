import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import * as ls from 'localstorage-slim';
import { environmentRoutes, webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo } from '@core/utils';
import { localStorageKeys, secret_stash_localstorageKeys } from '@core/utils/constants';
import { create } from 'zustand';
import { useRouting } from '../common';
import { AuthStoreInterface, SecretStashInterface } from '../interface';
import {
  giveMeAuthInitialState,
  giveMeSSAuthLoginInitialState,
  validateResetPasswordData,
  validateSignUpData,
} from '../utils';
import { enqueueSnackbar } from 'notistack';

const initialState = giveMeSSAuthLoginInitialState();

export const useAuthLogin = create<SecretStashInterface>((set, get) => ({
  SecretStashSignInState: initialState.SecretStashSignInState,

  signInLoading: false,

  signInMessage: '',

  signInError: false,

  setSignInState: (payload: { key: string; value: string }) => {
    set((state) => ({ SecretStashSignInState: { ...state.SecretStashSignInState, [payload.key]: payload.value } }));
  },

  signIn: async () => {
    set({ signInLoading: true, signInMessage: '', signInError: false });
    try {
      const { SecretStashSignInState: payload } = get();
      if (payload.user_name.trim().length === 0 || payload.password.trim().length === 0) {
        set({ signInMessage: 'Please enter username/password', signInError: true });
        return false;
      }
      const response = await httpRequest('post', `https://dev-secrethub-api.crayond.com/api/v1/auth/login`, payload);
      if (response?.data?.status === 200) {
        debugger;

        set({ signInMessage: response?.data?.message, signInError: false });
        const token = response?.data?.token;

        localStorage.setItem(localStorageKeys.authToken, token);
        routeTo(useRouting, environmentRoutes?.environment);
        enqueueSnackbar(response?.data?.message, { variant: 'success' });

        return response?.data?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
      enqueueSnackbar(message, { variant: 'error' });
      set({ signInMessage: message, signInError: true });
    } finally {
      set({ signInLoading: false });
    }
  },
}));
