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
  firstName: string;
  lastName: string;
  emailId: string;
  mobile: string;
  setPassword: string;
  confirmPassword: string;
  error: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobile: string;
    setPassword: string;
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
    firstName: '',
    lastName: '',
    emailId: '',
    mobile: '',
    setPassword: '',
    confirmPassword: '',
    error: {
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      emailId: '',
      mobile: '',
      username: '',
      setPassword: '',
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
  signUp: async () => {
    try {
      const { isInputsValid } = get();
      if (!isInputsValid()) return;
      set({ loading: true });
      // const response = await httpRequest('post', {});
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

    // checking FirstName
    if (userState?.firstName.length === 0) {
      isValid = false;
      error['firstName'] = 'Enter a valid firstName';
    } else {
      error['firstName'] = '';
    }
    // checking LastName
    if (userState?.lastName.length === 0) {
      isValid = false;
      error['lastName'] = 'Enter a valid lastName';
    } else {
      error['lastName'] = '';
    }
    // checking email Id
    const filter = /\S+@\S+\.\S+/;
    if (userState?.emailId?.length > 0 && !filter.test(userState?.emailId)) {
      isValid = false;
      error.emailId = 'Please enter the valid mail';
    } else {
      error.emailId = '';
    }

    // checking MObile
    if (userState?.mobile?.length > 0 && userState?.mobile?.length !== 10) {
      isValid = false;
      error.mobile = 'Please enter your mobilenumber';
    } else {
      error.mobile = '';
    }
    // checking SetPassword
    if (userState?.setPassword.length === 0) {
      isValid = false;
      error['setPassword'] = 'Enter a valid lastName';
    } else {
      error['setPassword'] = '';
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
