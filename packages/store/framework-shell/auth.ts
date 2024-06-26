import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo } from '@core/utils';
import { localStorageKeys } from '@core/utils/constants';
import { create } from 'zustand';
import { useRouting } from '../common';
import { AuthStoreInterface } from '../interface';
import { giveMeAuthInitialState, validateResetPasswordData, validateSignUpData } from '../utils';
import { useUser } from './user';
import { enqueueSnackbar } from 'notistack';
// import { useHistory } from 'react-router-dom';
const initialState = giveMeAuthInitialState();
// const history = useHistory();

export const useAuth = create<AuthStoreInterface>((set, get) => ({
  signInState: initialState.signInState,
  signUpState: initialState.signUpState,
  forgotPasswordState: initialState.forgotPasswordState,
  resetPasswordState: initialState.resetPasswordState,
  changePasswordState: initialState.changePasswordState,

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
  resetSuccess: false,

  setSignInState: (payload: { key: string; value: string }) => {
    set((state) => ({ signInState: { ...state.signInState, [payload.key]: payload.value } }));
  },
  setSignUpState: (payload: { key: string; value: string }) => {
    set((state) => ({
      signUpState: {
        ...state.signUpState,
        [payload.key]: payload.value,
        error: { ...state.signUpState.error, [payload.key]: '' },
      },
    }));
  },
  setForgotPasswordState: (payload: { key: string; value: string }) => {
    set((state) => ({ forgotPasswordState: { ...state.forgotPasswordState, [payload.key]: payload.value } }));
  },
  setRestPasswordState: (payload: { key: string; value: string }) => {
    set((state) => ({ resetPasswordState: { ...state.resetPasswordState, [payload.key]: payload.value } }));

    const { resetPasswordState } = get();

    const { isValid, message } = validateResetPasswordData(resetPasswordState);

    if (!isValid) {
      set({ resetPasswordMessage: message, resetPasswordError: true });
      return false;
    } else {
      set({ resetPasswordMessage: '', resetPasswordError: false });
    }
  },
  setChangePasswordState: (key: string, value: string) => {
    set((state) => ({ changePasswordState: { ...state.changePasswordState, [key]: value } }));
  },

  signIn: async () => {
    set({ signInLoading: true, signInMessage: '', signInError: false });
    try {
      const { signInState: payload } = get();

      if (payload.username.trim().length === 0 || payload.password.trim().length === 0) {
        set({ signInMessage: 'Please enter username/password', signInError: true });
        return false;
      }

      const response = await httpRequest('post', `${envConfig.api_url}/framework_shell_auth/sign_in `, payload);
      if (response?.status === 200 && response?.data?.data) {
        const token = response?.data?.data?.token;
        const user = parseJwt(token);
        useUser.setState({ user });
        localStorage.setItem(localStorageKeys.authToken, token);
        set({ signInMessage: 'Signed in Successfully', signInError: false });
        if (user.isSuperAdmin === true) {
          window.location.href = '/superAdmin';
          // console.log('super admin');
        } else {
          window.location.href = '/admin';
        }
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
  // /idm/user-profile/list/organisation?limit=20&offset=0

  getUserProfileList: () => {
    set({ signInLoading: true, signInError: false });

    httpRequest('get', `${envConfig.api_url}/idm/user-profile/list/organisation?limit=20&offset=0`, {}, true)
      .then((response) => {
      })
      .catch((err) => {
        set({ signInError: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ signInLoading: false });
      });
  },
  signUp: async (data: any) => {
    set({ signUpLoading: true, signUpMessage: '', signUpError: false });

    try {
      const { signUpState } = get();

      const { isValid, error } = validateSignUpData(signUpState);

      if (!isValid) {
        set((state) => ({ signUpState: { ...state.signUpState, error } }));
        return false;
      }

      const payload: any = {
        first_name: signUpState.firstName,
        last_name: signUpState.lastName,
        email_id: signUpState.emailId,
        mobile_no: signUpState.mobile,
        username: signUpState.username,
        password: signUpState.password,
      };


      const response = await httpRequest(
        'put',
        `${envConfig.api_url}/framework_shell_auth/token/user`,
        payload,
        false,
        '',
        {
          headers: { token: data }
        }
      )

      if (response?.status === 200) {
        let seconds = 5;
        set({
          signUpMessage:
            'You have been Successfully Signed Up, You will rediected to Login Page in ' + seconds + ' seconds.',
        });
        const interval = setInterval(() => {
          seconds -= 1;
          set({
            signUpMessage:
              'You have been Successfully Signed Up, You will rediected to Login Page in ' + seconds + ' seconds.',
          });
          if (seconds === 1) {
            routeTo(useRouting, webRoutes.login);
            clearInterval(interval);
          }
        }, 1000);
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

      const payload = {
        email_id: forgotPasswordState.email_id
      }
      const response = await httpRequest('post', `${envConfig.api_url}/framework_shell_auth/forgot_password`, forgotPasswordState);

      if (response?.status === 200) {
        set({ forgotPasswordMessage: 'We have sent a link to reset your password, please check your email inbox' });
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


  resetPassword: async (data) => {
    set({ resetPasswordLoading: true, resetPasswordMessage: '', resetPasswordError: false, resetSuccess: false });
    try {
      const { resetPasswordState } = get();

      const { isValid, message } = validateResetPasswordData(resetPasswordState);

      if (!isValid) {
        set({ resetPasswordMessage: message, resetPasswordError: true });
        return false;
      } else {
        set({ resetPasswordMessage: '', resetPasswordError: false });
      }

      const response = await httpRequest(
        'post',
        `${envConfig.api_url}/framework_shell_auth/reset_password`,
        { new_password: resetPasswordState.password },
        false,
        '',
        {
          headers: { token: data },
        }
        // { headers: { Authorization: 'Bearer ' + data } },
      );

      if (response?.status === 200) {
        let seconds = 1;
        set({
          resetPasswordMessage:
            'Your password has been reseted, You will rediected to Login Page in ' + seconds + ' seconds.',
          resetSuccess: true,
        });
        const interval = setInterval(() => {
          seconds += 1;
          set({
            resetPasswordMessage:
              'Your password has been reseted, You will rediected to Login Page in ' + seconds + ' seconds.',
          });
          if (seconds === 5) {
            routeTo(useRouting, webRoutes.login);
            clearInterval(interval);
          }
        }, 1000);
        return response?.status;
      } else {
        throw new Error('Internal Server Error');
      }
    } catch (err: any) {
      log('error', err);
      const message = err?.response?.data?.message ?? 'Something went wrong while reseting the password!';
      set({ resetPasswordMessage: message, resetPasswordError: true, resetSuccess: false });
    } finally {
      set({ resetPasswordLoading: false });
    }
  },

  changePassword: async () => {
    const slugId = '98a60c91-a068-43cb-989d-172cf3f90321';

    const { changePasswordState } = get();
    set({ resetPasswordError: false });

    const payload = {
      newPassword: changePasswordState.password,
    };

    try {
      const response = await httpRequest(
        'post',
        `${envConfig.api_url}/framework_shell_auth/changePassword`,
        payload,
        true,
        undefined,
        {
          headers: { slug: slugId },
        },
      );

      if (response.data.status === '200') {
        enqueueSnackbar('Password Changed Successfully!', { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message || 'Password change failed.', { variant: 'error' });
        set({ resetPasswordError: true });
      }
    } catch (err) {
      enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      set({ resetPasswordError: true });
    } finally {
      set({ resetPasswordError: false });
    }
  },

  logOut: () => {
    set({
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
    });
    localStorage.removeItem(localStorageKeys.authToken);
    useUser.setState({ user: null });
    window.location.href = '/login';
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
