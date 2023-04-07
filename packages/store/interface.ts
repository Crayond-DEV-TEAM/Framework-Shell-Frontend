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

export interface SelectBoxInterface {
  value: number | string;
  label: string;
  is_default?: boolean;
  id?: number | string;
  name?: number | string;
}

export interface LanguageConfigInterface {
  languages: SelectBoxInterface[];
  masterLanguages: SelectBoxInterface[];
  masterLanguageLoading: boolean;
  masterLanguageError: boolean;
  defaultLang: SelectBoxInterface | null;
  isSaved: boolean;
  saving: boolean;
  errorOnSaving: boolean;
  fetching: boolean;
  errorOnFetching: boolean;
  message: string;
  getSavedLanguage: () => boolean;
  getAllLanguages: () => boolean;
  addLanguage: (lang: SelectBoxInterface, index: number) => boolean;
  deleteLanguage: (lang: SelectBoxInterface, index: number) => boolean;
  updateDefaultLang: (lang: SelectBoxInterface, index: number) => boolean;
  saveLanguage: () => boolean;
}
export interface MessageGroup {
  id?: number | string;
  title: number | string;
  description: number | string;
  is_status: boolean;
}

export interface MessageConfigInterface {
  messageGroup: MessageGroup[];
  deleteMessage: () => boolean;
  setdeleteMessage: (payload: { id: string }) => void;

  editMessage: MessageGroup;
  // seteditMessage: (payload: { key: string; value: string }) => void;

  addMessage: MessageGroup;
  setaddMessage: (payload: { key: string; value: string }) => void;

  editMessageList: MessageGroup;
  seteditMessagelist: (payload: { key: string; value: string }) => void;

  fetching: boolean;
  errorOnFetching: boolean;

  editMessageLoading: boolean;
  editMessageError: boolean;

  addMessageLoading: boolean;
  addMessageError: boolean;

  deleteMessageLoading: boolean;
  deleteMessageError: boolean;

  getMessageGroups: () => boolean;
  editMessageGroups: () => boolean;
  deleteMessageGroups: () => boolean;
  addMessageGroups: () => boolean;
  editMessageListGroups: () => boolean;
}
