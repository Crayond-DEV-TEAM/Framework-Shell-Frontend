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
import { enqueueSnackbar } from 'notistack'
// import { useHistory } from 'react-router-dom';
const initialState = giveMeAuthInitialState();
// const history = useHistory();

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

  signIn: async () => {
    set({ signInLoading: true, signInMessage: '', signInError: false });
    try {
      // debugger;
      const { signInState: payload } = get();

      if (payload.username.trim().length === 0 || payload.password.trim().length === 0) {
        set({ signInMessage: 'Please enter username/password', signInError: true });
        return false;
      }

      const response = await httpRequest('post', `${envConfig.api_url}/framework_shell_auth/sign_in `, payload);
      if (response?.status === 200 && response?.data?.data) {
        debugger;
        const token = response?.data?.data?.token;
        const user = parseJwt(token);
        useUser.setState({ user });
        console.log(user, 'uiseriser');
        localStorage.setItem(localStorageKeys.authToken, token);
        set({ signInMessage: 'Signed in Successfully', signInError: false });
        if (user.isSuperAdmin === true) {
           window.location.href = '/superAdmin';
          console.log('super admin');
        } else {
          window.location.href = '/admin';
        }

        // if (user.role_name === 'ADMIN') {
        //   console.log('d');
        // } else {
        //   console.log('s');
        // }
        // debugger
        // history.push("/languageConfig")
        // routeTo(useRouting, webRoutes.languageConfig);
        // window.location.href = '/languageConfig';
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
        debugger;
        
      })
      .catch((err) => {
        set({ signInError: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ signInLoading: false });
      });
  },


  signUp: async () => {
    // debugger;
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

      const response = await httpRequest('post', `${envConfig.api_url}/sign_up`, payload);

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

      const response = await httpRequest('put', `${envConfig.api_url}/forgot_password`, forgotPasswordState);

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

  resetPassword: async (payload) => {
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
        'put',
        `${envConfig.api_url}/reset_password`,
        { new_password: resetPasswordState.password },
        false,
        { headers: { Authorization: 'Bearer ' + payload.token } },
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
    window.location.replace(envConfig.frame_work_shell_ui + '/?task=logout');
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
