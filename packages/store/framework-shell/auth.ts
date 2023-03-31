import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo } from '@core/utils';
import { localStorageKeys } from '@core/utils/constants';
import { create } from 'zustand';
import { useRouting } from '../common';
import { AuthStoreInterface } from '../interface';
import { giveMeAuthInitialState } from '../utils';
import { useUser } from './user';

const initialState = giveMeAuthInitialState();

export const useAuth = create<AuthStoreInterface>((set, get) => ({
  signInState: initialState.signInState,
  signUpState: initialState.signUpState,
  forgotPasswordState: initialState.forgotPasswordState,
  resetPasswordState: initialState.resetPasswordState,

  signInLoading: false,
  signUpLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,

  signInMessage: '',
  signUpMessage: '',
  forgotPasswordMessage: '',
  resetPasswordMessage: '',

  signInError: false,
  signUpError: false,
  forgotPasswordError: false,
  resetPasswordError: false,

  setSignInState: (payload: { key: string; value: string }) => {
    set((state) => ({ signInState: { ...state.signInState, [payload.key]: payload.value } }));
  },
  setSignUpState: (payload: { key: string; value: string }) => {
    set((state) => ({ signUpState: { ...state.signUpState, [payload.key]: payload.value } }));
  },
  setForgotPasswordState: (payload: { key: string; value: string }) => {
    set((state) => ({ forgotPasswordState: { ...state.forgotPasswordState, [payload.key]: payload.value } }));
  },
  setRestPasswordState: (payload: { key: string; value: string }) => {
    set((state) => ({ resetPasswordState: { ...state.resetPasswordState, [payload.key]: payload.value } }));
  },

  signIn: async () => {
    set({ signInLoading: true, signInMessage: '', signInError: false });

    try {
      const { signInState: payload } = get();

      if (payload.username.trim().length === 0 || payload.password.trim().length === 0) {
        set({ signInMessage: 'Please enter username/password', signInError: true });
        return false;
      }

      const response = await httpRequest('post', `${envConfig.auth_url}/sign_in `, payload);

      if (response?.status === 200 && response?.data?.data) {
        const token = response?.data?.data;
        const user = parseJwt(token);
        useUser.setState({ user });
        localStorage.setItem(localStorageKeys.authToken, token);
        set({ signInMessage: 'Signed in Successfully', signInError: false });
        routeTo(useRouting, webRoutes.root);
        return response?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while signing in!';
      set({ signInMessage: message, signInError: true });
    } finally {
      set({ signInLoading: false });
    }
  },

  signUp: async () => {
    set({ signUpLoading: true, signUpMessage: '', signUpError: false });

    try {
      const { signUpState } = get();

      const payload: any = { ...signUpState, password: signUpState.confirmPassword };
      delete payload.error;
      delete payload.password;

      const response = await httpRequest('post', `${envConfig.auth_url}/sign_up`, payload);

      if (response?.status === 200) {
        routeTo(useRouting, webRoutes.login);
        return response?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while signing up!';
      set({ signUpMessage: message, signUpError: true });
    } finally {
      set({ signUpLoading: false });
    }
  },

  forgotPassword: async () => {
    set({ forgotPasswordLoading: true, forgotPasswordMessage: '', forgotPasswordError: false });
    try {
      const { forgotPasswordState } = get();

      const response = await httpRequest('put', `${envConfig.auth_url}/forgot_password`, forgotPasswordState);

      if (response?.status === 200) {
        set({ forgotPasswordMessage: 'we have sent a link to reset your password, please check your email inbox' });
        return response?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while sending reset link!';
      set({ forgotPasswordMessage: message, forgotPasswordError: true });
    } finally {
      set({ forgotPasswordLoading: false });
    }
  },

  resetPassword: async (payload) => {
    set({ resetPasswordLoading: true, resetPasswordMessage: '', resetPasswordError: false });
    try {
      const { resetPasswordState } = get();

      const response = await httpRequest(
        'put',
        `${envConfig.auth_url}/reset_password`,
        { new_password: resetPasswordState.password },
        false,
        { headers: { Authorization: 'Bearer ' + payload.token } },
      );
      if (response?.status === 200) {
        return response?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while reseting the password!';
      set({ resetPasswordMessage: message, resetPasswordError: true });
    } finally {
      set({ resetPasswordLoading: false });
    }
  },

  logOut: () => {
    set({
      signInState: initialState.signInState,
      signUpState: initialState.signUpState,
      forgotPasswordState: initialState.forgotPasswordState,
      resetPasswordState: initialState.resetPasswordState,
    });
    localStorage.removeItem(localStorageKeys.authToken);
    useUser.setState({ user: null });
    routeTo(useRouting, webRoutes.login);
  },

  clearAll: () => {
    set({
      signInState: initialState.signInState,
      signUpState: initialState.signUpState,
      forgotPasswordState: initialState.forgotPasswordState,
      resetPasswordState: initialState.resetPasswordState,
    });
  },
}));
