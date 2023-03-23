import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import { ValidateEmail } from '@core/utils';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';
import { signUpStyle } from './style';

export interface SignUpProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SignUp = forwardRef((props: SignUpProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const { userState, signUp, setUser, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      signUp: state.signUp,
      setUser: state.setUser,
      userState: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );

  // General Hooks
  const [showpassword, setPassword] = useState<boolean>(false);
  const [values, setValues] = useState(userState);

  const handleClickShowPassword = () => {
    setPassword(!showpassword);
  };

  const isInputsValid = () => {
    let isValid = true;
    const error = values?.error;

    //  Checking username
    if (values?.username.length === 0) {
      isValid = false;
      error.username = 'Enter a valid username';
    } else {
      error.username = '';
    }

    // Checking password
    if (values?.setPassword.length === 0) {
      isValid = false;
      error.setPassword = 'Enter the password';
    } else {
      error.setPassword = '';
    }

    // checking FirstName
    if (values?.firstName.length === 0) {
      isValid = false;
      error.firstName = 'Enter a valid firstName';
    } else {
      error.firstName = '';
    }
    // checking LastName
    if (values?.lastName.length === 0) {
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
    if (values.emailId.length > 0 && !ValidateEmail(values?.emailId)) {
      isValid = false;
      error.emailId = 'Invalid email';
    }

    //validate mobile
    if (values?.mobile?.length === 0) {
      isValid = false;
      error.mobile = 'Enter a mobile number';
    } else if (values?.mobile?.length < 10) {
      isValid = false;
      error.mobile = 'Enter a valid 10 digit mobile number';
    } else {
      error.mobile = '';
    }
    setValues({ ...values, error });

    return isValid;
  };

  const handleChange = (key: any, val: any) => {
    if (key === 'mobile') {
      val = Math.max(0, parseInt(val)).toString().slice(0, 10);
    }
    setValues({ ...values, [key]: val, error: { ...values.error, [key]: '' } });
  };

  const signUpHit = async () => {
    if (isInputsValid()) {
      const error = values?.error;
      error.password = '';
      error.confirmPassword = '';
      setValues({ ...values, error });
      // calling the signUp api
      const response: any = await signUp(values);
      if (response === 200) {
        setValues({
          ...values,
          firstName: '',
          password: '',
          lastName: '',
          emailId: '',
          mobile: '',
          username: '',
          setPassword: '',
          error: {
            ...userState?.error,
            firstName: '',
            password: '',
            lastName: '',
            emailId: '',
            mobile: '',
            username: '',
            setPassword: '',
          },
        });
      }
    }
  };
  useEffect(() => {
    setUser({
      ...userState,
      error: {
        firstName: '',
        password: '',
        lastName: '',
        emailId: '',
        mobile: '',
        username: '',
        setPassword: '',
      },
    });
    return setValues({
      ...userState,
      error: {
        ...userState.error,
        firstName: '',
        password: '',
        lastName: '',
        emailId: '',
        mobile: '',
        username: '',
        setPassword: '',
      },
    });
  }, []);

  return (
    <Box
      sx={[
        {
          ...signUpStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={signUpStyle.cardContentSx}>
        <Typography sx={signUpStyle.createPasswordSx}>Sign Up</Typography>
        {/* First Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="firstName">
            First name
          </Label>
          <Input
            size="small"
            value={values?.firstName ?? ''}
            id="firstName"
            placeholder="First Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('firstName', e.target.value)
            }
            isError={values?.error?.firstName?.length ? true : false}
            errorMessage={values?.error?.firstName}
          />
        </Box>
        {/* Last Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="lastName">
            Last name
          </Label>
          <Input
            size="small"
            value={values?.lastName ?? ''}
            id="lastName"
            placeholder="Last Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('lastName', e.target.value)
            }
            isError={values?.error?.lastName?.length ? true : false}
            errorMessage={values?.error.lastName}
          />
        </Box>
        {/* Email ID */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="emailId">
            Email ID
          </Label>
          <Input
            size="small"
            value={values?.emailId ?? ''}
            id="emailId"
            placeholder="Email Id"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('emailId', e.target.value)
            }
            isError={values?.error?.emailId?.length ? true : false}
            errorMessage={values?.error?.emailId}
          />
        </Box>
        {/* Mobile */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="number">
            Mobile
          </Label>
          <Input
            type="number"
            size="small"
            value={values?.mobile ?? ''}
            id="mobile"
            placeholder="Mobile"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('mobile', e.target.value)
            }
            isError={values?.error?.mobile?.length ? true : false}
            errorMessage={values?.error.mobile}
          />
        </Box>
        {/* User Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            User Name
          </Label>
          <Input
            size="small"
            value={values?.username ?? ''}
            id="username"
            placeholder="Username"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('username', e.target.value)
            }
            isError={values?.error?.username?.length ? true : false}
            errorMessage={values?.error?.username}
          />
        </Box>
        {/* Set password */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="password" isRequired>
            Set password
          </Label>
          <Input
            id="setPassword"
            type={showpassword ? 'text' : 'password'}
            value={values?.setPassword ?? ''}
            size="small"
            placeholder="Set Password"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('setPassword', e.target.value)
            }
            endAdornment={
              <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={signUpStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={signUpStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={values?.error?.setPassword?.length ? true : false}
            errorMessage={values?.error.setPassword}
          />
        </Box>
        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={signUpStyle.loginButtonSx} onClick={() => signUpHit()} loading={loading}>
            sign up
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, justifyContent: 'center' }}>
          <Typography sx={signUpStyle.loginSx}>If you ve an account already?</Typography>
          <Link
            style={{
              color: '#353448',
              fontWeight: '600',
              textDecoration: 'underline',
              paddingLeft: '5px',
              fontSize: '14px',
            }}
            to={webRoutes.login}
          >
            Log In
          </Link>
        </Box>
      </Box>
    </Box>
  );
});

SignUp.displayName = 'SignUp';
