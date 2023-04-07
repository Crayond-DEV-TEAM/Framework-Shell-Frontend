import { ValidateEmail } from '@core/utils';
import {
  ForgotPasswordState,
  ResetPasswordState,
  SignInState,
  SignUpStateInterface,
  UserDataInterface,
  MessageGroup,
} from './interface';

export const giveMeAuthInitialState = (): {
  signUpState: SignUpStateInterface;
  signInState: SignInState;
  forgotPasswordState: ForgotPasswordState;
  resetPasswordState: ResetPasswordState;
} => {
  return {
    signUpState: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      emailId: '',
      mobile: '',
      confirmPassword: '',
      error: { username: '', password: '', firstName: '', lastName: '', emailId: '', mobile: '', confirmPassword: '' },
    },
    signInState: { username: '', password: '' },
    forgotPasswordState: { email_id: '' },
    resetPasswordState: { password: '', confirmPassword: '' },
  };
};

export const giveMeUserIntialState = (): UserDataInterface => ({
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  token: '',
});

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const validateSignUpData = (values: SignUpStateInterface) => {
  let isValid = true;
  const error = values.error;

  //  Checking username
  if (values.username.length === 0) {
    isValid = false;
    error.username = 'Enter a valid username';
  } else {
    error.username = '';
  }

  // Checking password
  if (values.password.length === 0) {
    isValid = false;
    error.password = 'Enter the password';
  } else if (passwordRegex.test(values.password) === false) {
    isValid = false;
    error.password =
      'Password must have 8 digit and contain a uppercase, lowercase and a special character. (E.g Test@123)';
  } else {
    error.password = '';
  }

  // Checking Confirm Password
  if (values.confirmPassword.length === 0) {
    isValid = false;
    error.confirmPassword = 'Enter the Confirm Password';
  } else {
    error.confirmPassword = '';
  }

  // Checking password and confirm password are same
  if (values.confirmPassword.length > 0 && values.confirmPassword !== values.password) {
    isValid = false;
    error.confirmPassword = 'Password and confirm password is not matching';
  }

  // checking FirstName
  if (values.firstName.length === 0) {
    isValid = false;
    error.firstName = 'Enter a valid firstName';
  } else {
    error.firstName = '';
  }
  // checking LastName
  if (values.lastName.length === 0) {
    isValid = false;
    error.lastName = 'Enter a valid lastName';
  } else {
    error.lastName = '';
  }

  //Checking email
  if (values.emailId.length === 0) {
    isValid = false;
    error.emailId = 'Email is required';
  }

  //validate email
  if (values.emailId.length > 0 && !ValidateEmail(values.emailId)) {
    isValid = false;
    error.emailId = 'Invalid email';
  }

  //validate mobile
  if (values.mobile?.length === 0) {
    isValid = false;
    error.mobile = 'Enter a mobile number';
  } else if (values.mobile?.length < 10) {
    isValid = false;
    error.mobile = 'Enter a valid 10 digit mobile number';
  } else if (values.mobile?.length > 10) {
    isValid = false;
    error.mobile = 'Mobile number must be less than 10 digits';
  } else {
    error.mobile = '';
  }

  return { isValid, error };
};

export const validateResetPasswordData = (values: ResetPasswordState) => {
  let isValid = true;
  let message = '';

  // Checking password
  if (values.password.length === 0 && values.confirmPassword.length === 0) {
    isValid = false;
    message = 'Enter the password and confirm password';
  } else if (values.password.length === 0) {
    isValid = false;
    message = 'Enter the password';
  } else if (!passwordRegex.test(values.password)) {
    isValid = false;
    message = 'Password must have 8 digit and contain a uppercase, lowercase and a special character. (E.g Test@123)';
  } else if (values.confirmPassword !== values.password) {
    isValid = false;
    message = 'Password and confirm password is not matching';
  }

  return { isValid, message };
};

export const giveMeMessageGroupInitialState = (): MessageGroup => {
  return { title: '', description: '', is_status: false };
};
