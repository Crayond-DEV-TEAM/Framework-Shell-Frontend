import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo } from '@core/utils';
import { localStorageKeys } from '@core/utils/constants';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { useRouting } from '../common';
import { useUser } from './user';

export interface UserStateProps {
  username: string;
  password: string;
  confirmPassword: string;
  error: {
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export interface OnboardingProps {
  userState: UserStateProps;
  loading: boolean;
  signIn: () => void;
  logOut: () => void;
  handleLoginChange: (key: string, value: string) => void;
  isInputsValid: () => boolean;
}

export const useOnboarding = create<OnboardingProps>((set, get) => ({
  userState: {
    username: 'acharlota',
    password: 'M9lbMdydMN',
    confirmPassword: '',
    error: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  },
  loading: false,
  signIn: async () => {
    try {
      const { isInputsValid, userState } = get();

      if (!isInputsValid()) return;

      set({ loading: true });
      // Hitting the signin API
      const response = await httpRequest('post', `${envConfig.auth_url}/login`, {
        username: userState?.username ?? '',
        password: userState?.password ?? '',
      });
      // If the user is exists
      if (response?.status === 200 && response?.data?.token) {
        const token = response?.data?.token;
        const user = parseJwt(token);
        useUser.setState({
          user,
        });
        localStorage.setItem(localStorageKeys.authToken, token);
        enqueueSnackbar('Signed in successfully', { variant: 'success' });
        routeTo(useRouting, webRoutes.home);
      }
      set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },
  logOut: () => {
    set({
      userState: {
        username: 'acharlota',
        password: 'M9lbMdydMN',
        confirmPassword: '',
        error: {
          username: '',
          password: '',
          confirmPassword: '',
        },
      },
    });
    localStorage.removeItem(localStorageKeys.authToken);
    useUser.setState({
      user: null,
    });
    enqueueSnackbar('Signed out successfully', { variant: 'success' });
    return routeTo(useRouting, webRoutes.login);
  },
  handleLoginChange: (key, value) => {
    const { userState } = get();
    set({
      userState: {
        ...userState,
        [key]: value,
      },
    });
  },

  isInputsValid: () => {
    const { userState } = get();

    let isValid = true;
    const error = userState.error;

    //  Checking username
    if (userState?.username.length === 0) {
      isValid = false;
      error['username'] = 'Enter a valid username';
    } else {
      error['username'] = '';
    }

    // Checking password
    if (userState?.password.length === 0) {
      isValid = false;
      error['password'] = 'Enter the password';
    } else {
      error['password'] = '';
    }
    set({
      userState: {
        ...userState,
        error,
      },
    });
    return isValid;
  },
}));
