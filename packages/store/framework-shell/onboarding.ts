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
  signIn: () => void;
  signUp: () => void;
  logOut: () => void;
  forgotPassword: () => void;
  resetPassword: () => void;
  handleLoginChange: (key: string, value: string) => void;
  isInputsValid: () => boolean;
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

  signIn: async () => {
    try {
      const { userState } = get();

      // if (!isInputsValid()) return;
      set({ loading: true });
      // Hitting the signin API
      const response = await httpRequest('post', `https://dev-framework-api.crayond.com/api/v1/auth/sign_in `, {
        username: userState?.username ?? '',
        password: userState?.password ?? '',
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

  signUp: async () => {
    try {
      const { isInputsValid, userState } = get();
      if (isInputsValid()) {
        set({ loading: true });
        // Hitting the signin API
        const response = await httpRequest('post', `${envConfig.auth_url}/sign_up`, {
          email_id: userState?.emailId ?? '',
          mobile_no: userState?.mobile ?? '',
          username: userState?.username ?? '',
          password: userState?.setPassword ?? '',
          first_name: userState?.firstName ?? '',
          last_name: userState?.lastName ?? '',
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
        }

        set({ loading: false });
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },
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

  forgotPassword: async () => {
    try {
      const { userState } = get();

      set({ loading: true });
      const response = await httpRequest('put', `${envConfig.auth_url}/forgot_password`, {
        email_id: userState?.emailId ?? '',
      });
      if (response?.data?.status?.code === '401') {
        set({ userState, loading: false });
        return enqueueSnackbar('Sign up in successfully', { variant: 'success' });
      }
      if (response?.status === 200) {
        const token = response?.data?.data;
        // localStorage.setItem(localStorageKeys?.authTempKey, true);
        localStorage.setItem(localStorageKeys.authToken, token);
        enqueueSnackbar(' link sent to resgisternmail ID', { variant: 'success' });
        routeTo(useRouting, webRoutes.resetPassword);
      }
      return set({ loading: false });
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

  resetPassword: async () => {
    try {
      const { isInputsValid, userState } = get();
      if (isInputsValid()) {
        set({ loading: true });
        const response = await httpRequest(
          'put',
          `${envConfig.auth_url}/reset_password`,
          {
            new_password: userState?.password ?? '',
          },
          true,
        );
        if (response?.data?.status?.code !== '200') {
          set({ userState, loading: false });
          return enqueueSnackbar('please check the password', { variant: 'success' });
        }
        set({ userState, loading: false });
        enqueueSnackbar('Please sign in to continue', { variant: 'success' });
        localStorage.clear();
        routeTo(useRouting, webRoutes.login);
      }
    } catch (err: any) {
      set({ loading: false });
      log('error', err);
      enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong while logging in!', { variant: 'error' });
    }
  },

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

  // errorUpdate: (error) => {
  //   const { userState } = get();

  //   set({
  //     userState: {
  //       ...userState,
  //       error: error,
  //     },
  //   });
  // },

  isInputsValid: () => {
    const { userState } = get();

    let isValid = true;
    const error = userState?.error;

    //  Checking username
    if (userState?.username.length === 0) {
      isValid = false;
      error.username = 'Enter a valid username';
    } else {
      error.username = '';
    }

    // Checking password
    if (userState?.password.length === 0) {
      isValid = false;
      error.password = 'Enter the password';
    } else {
      error.password = '';
    }

    // checking FirstName
    if (userState?.firstName.length === 0) {
      isValid = false;
      error.firstName = 'Enter a valid firstName';
    } else {
      error.firstName = '';
    }
    // checking LastName
    if (userState?.lastName.length === 0) {
      isValid = false;
      error.lastName = 'Enter a valid lastName';
    } else {
      error.lastName = '';
    }

    //Checking email
    if (userState.emailId.length === 0) {
      isValid = false;
      error.emailId = 'Email is required';
    }
    //validate email
    if (userState.emailId.length > 0 && !ValidateEmail(userState?.emailId)) {
      isValid = false;
      error.emailId = 'Invalid email';
    }

    if (userState?.mobile?.length === 0) {
      isValid = false;
      error.mobile = 'Enter a mobile number';
    } else if (userState?.mobile?.length < 10) {
      isValid = false;
      error.mobile = 'Enter a valid 10 digit mobile number';
    } else {
      error.mobile = '';
    }

    // checking SetPassword
    if (userState?.setPassword.length === 0) {
      isValid = false;
      error.setPassword = 'Enter a valid password';
    } else {
      error.setPassword = '';
    }
    // checking SetPassword
    if (userState?.confirmPassword.length === 0) {
      isValid = false;
      error['confirmPassword'] = 'Enter confirm Password';
    } else {
      error['confirmPassword'] = '';
    }
    if (userState.confirmPassword.length > 0) {
      if (userState.password.length > 0 && userState.password !== userState.confirmPassword) {
        isValid = false;
        error.confirmPassword = 'Password does not match';
      }
    }
    if (userState.password !== '' && userState.confirmPassword !== '') {
      if (userState.password === userState.confirmPassword) {
        isValid = true;
      }
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
