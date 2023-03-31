export interface SignUpStateInterface {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobile: string;
  confirmPassword: string;
  error: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobile: string;
    confirmPassword: string;
  };
}

export interface SignInState {
  username: string;
  password: string;
}

export interface ForgotPasswordState {
  email_id: string;
}

export interface ResetPasswordState {
  password: string;
  confirmPassword: string;
}

export interface AuthStoreInterface {
  signUpState: SignUpStateInterface;
  setSignUpState: (payload: { key: string; value: string }) => void;

  signInState: SignInState;
  setSignInState: (payload: { key: string; value: string }) => void;

  forgotPasswordState: ForgotPasswordState;
  setForgotPasswordState: (payload: { key: string; value: string }) => void;

  resetPasswordState: ResetPasswordState;
  setRestPasswordState: (payload: { key: string; value: string }) => void;

  signInLoading: boolean;
  signUpLoading: boolean;
  forgotPasswordLoading: boolean;
  resetPasswordLoading: boolean;

  signInMessage: string;
  signUpMessage: string;
  forgotPasswordMessage: string;
  resetPasswordMessage: string;

  signInError: boolean;
  signUpError: boolean;
  forgotPasswordError: boolean;
  resetPasswordError: boolean;

  resetSuccess: boolean;

  signIn: () => void;
  signUp: () => void;
  forgotPassword: () => void;
  resetPassword: (payload: { token: string | null }) => void;
  logOut: () => void;
  clearAll: () => void;
}

export interface UserDataInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
}

export interface UserInterface {
  user?: null | UserDataInterface;
  setUser: (payload: { key: string; value: string }) => void;
}
