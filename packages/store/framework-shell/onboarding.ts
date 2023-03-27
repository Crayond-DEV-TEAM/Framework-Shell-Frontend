import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo, ValidateEmail } from '@core/utils';
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
  // errorUpdate: () => void;
  setUser: (payload: any) => void;
  signIn: (payload: any) => void;
  signUp: (payload: any) => void;
  logOut: () => void;
  clearState: () => void;
  forgotPassword: (payload: any) => void;
  updateStateOnBoarding: () => void;
  updateErrorOnboarding: (error: any) => void;
  resetPassword: (payload: any) => void;
  handleLoginChange: (key: string, value: string) => void;
}

export const useOnboarding = create<OnboardingProps>((set, get) => ({
  userState: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobile: '',
    setPassword: '',
    confirmPassword: '',
    error: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      emailId: '',
      mobile: '',
      setPassword: '',
      confirmPassword: '',
    },
  },
  loading: false,

  // setUser
  setUser: (payload) => set({ userState: payload }),

  // signIn
  signIn: async (payload) => {
    try {
      // const { userState } = get();

      // if (!isInputsValid()) return;
      set({ loading: true });
      // Hitting the signin API
      const response = await httpRequest('post', `https://dev-framework-api.crayond.com/api/v1/auth/sign_in `, {
        username: payload?.username ?? '',
        password: payload?.password ?? '',
      });
      // If the user is exists
      if (response?.status === 200 && response?.data?.data) {
        const token = response?.data?.data;
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

  // signUp
  signUp: async (payload) => {
    try {
      set({ loading: true });
      // Hitting the signin API
      const response = await httpRequest('post', `${envConfig.auth_url}/sign_up`, {
        email_id: payload?.emailId ?? '',
        mobile_no: payload?.mobile ?? '',
        username: payload?.username ?? '',
        password: payload?.setPassword ?? '',
        first_name: payload?.firstName ?? '',
        last_name: payload?.lastName ?? '',
      });
      // If the user is exists
      if (response?.status === 200) {
        // const user_Id = response?.data?.id;
        // const user = parseJwt(user_Id);
        // useUser.setState({
        //   user,
        // });
        // localStorage.setItem(localStorageKeys.authToken, user_Id);
        enqueueSnackbar('Sign up in successfully', { variant: 'success' });
        routeTo(useRouting, webRoutes.login);
        set({ loading: false });
        return response?.status;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  // logOut
  logOut: () => {
    set({
      userState: {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        emailId: '',
        mobile: '',
        setPassword: '',
        error: {
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          emailId: '',
          mobile: '',
          setPassword: '',
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

  // forgotPassword
  forgotPassword: async (payload) => {
    try {
      const { userState } = get();

      set({ loading: true });
      const response = await httpRequest('put', `${envConfig.auth_url}/forgot_password`, {
        email_id: payload?.emailId ?? '',
      });

      if (response?.status === 200) {
        const token = response?.data?.data;
        // localStorage.setItem(localStorageKeys.authToken, token);
        set({
          userState: { ...payload },
          loading: false,
        });

        enqueueSnackbar(' Link sent to resgister Email ID', { variant: 'success' });
        // routeTo(useRouting, webRoutes.resetPassword);
        set({ loading: false });
        return response?.status;
      }
      return set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar('Invalid Email ID', { variant: 'error' });
    }
  },

  // resetPassword
  resetPassword: async (payload) => {
    try {
      const { userState, clearState } = get();

      set({ loading: true });
      const response = await httpRequest(
        'put',
        `${envConfig.auth_url}/reset_password`,
        {
          new_password: payload?.password ?? '',
        },
        true,
      );
      if (response?.status === 200) {
        set({
          userState: {
            ...payload,
          },
          loading: false,
        });
        enqueueSnackbar('Password Reset Successfully!', { variant: 'success' });
        localStorage.clear();
        set({ loading: false });
        return response?.status;
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while reset!', { variant: 'error' });
    }
  },

  // clearState
  clearState: () => {
    set({
      userState: {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        emailId: '',
        mobile: '',
        setPassword: '',
        error: {
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          emailId: '',
          mobile: '',
          setPassword: '',
        },
      },
    });
  },

  // handleLoginChange
  handleLoginChange: (key, value) => {
    const { userState } = get();

    if (key === 'mobile') {
      value = Math.max(0, parseInt(value)).toString().slice(0, 10);
    }
    set({
      userState: {
        ...userState,
        [key]: value,
      },
    });
  },

  // updateErrorOnboarding
  updateErrorOnboarding: (error: any) => {
    const { userState } = get();

    set({
      userState: {
        ...userState,
        error: {
          ...userState.error,
          ...error,
        },
      },
    });
  },

  // updateState
  updateStateOnBoarding: () =>
    set((state) => ({
      userState: {
        ...state?.userState,
        emailId: '',
        password: '',
      },
      loading: false,
    })),
}));
