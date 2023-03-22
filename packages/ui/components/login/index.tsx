import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import { ValidateEmail } from '@core/utils';
import { IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import isEqual from 'react-fast-compare';
import { Link, useNavigate } from 'react-router-dom';

import { loginStyle } from './style';

export interface LoginProps {
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export function Login(props: LoginProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;

  const navigate = useNavigate();

  const { userState, signIn, setUser, loading, updateErrorOnboarding, handleLoginChange } = useOnboarding(
    (state) => ({
      signIn: state.signIn,
      userState: state.userState,
      setUser: state.setUser,
      handleLoginChange: state.handleLoginChange,
      updateErrorOnboarding: state.updateErrorOnboarding,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );

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
    if (values?.password.length === 0) {
      isValid = false;
      error.password = 'Enter the password';
    } else {
      error.password = '';
    }
    setValues({ ...values, error });

    return isValid;
  };

  // const handleChange = (val: any, key: any) => {
  //   handleLoginChange(key, val);
  // };

  const handleChange = (key: any, val: any) => {
    // values?.error[key] = '';
    setValues({ ...values, [key]: val, error: { ...values.error, [key]: '' } });
  };

  const signInHIt = async () => {
    if (isInputsValid()) {
      const error = values?.error;
      error.password = '';
      error.emailId = '';
      setValues({ ...values, error });
      // calling the signin api

      const response: any = await signIn(values);
      if (response === 200) {
        setValues({
          ...values,
          password: '',
          emailId: '',
          error: {
            ...userState?.error,
            password: '',
            emailId: '',
          },
        });
      }
    }
  };

  useEffect(() => {
    setUser({
      ...userState,
      error: {
        password: '',
        emailId: '',
      },
    });
    return setValues({
      ...userState,
      error: {
        ...userState.error,
        password: '',
        emailId: '',
      },
    });
  }, []);

  return (
    <Box
      sx={[
        {
          ...loginStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={loginStyle.cardContentSx}>
        <Typography sx={loginStyle.signInSx}>Sign In</Typography>
        <Box sx={loginStyle.inputGroupSx}>
          <Label sx={loginStyle.labelSx} htmlFor="username">
            Username
          </Label>
          <Input
            size="small"
            value={values?.username ?? ''}
            id="username"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('username', e.target.value)
            }
            isError={values?.error?.username ? true : false}
            errorMessage={values?.error?.username ?? ''}
          />
        </Box>
        <Box sx={loginStyle.inputGroupSx}>
          <Label sx={loginStyle.labelSx} htmlFor="password" isRequired>
            password?
          </Label>
          <Input
            id="password"
            type={showpassword ? 'password' : 'text'}
            errorMessage={values?.error.password}
            value={values?.password ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('password', e.target.value)
            }
            isError={values?.error?.password?.length > 0}
            endAdornment={
              <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={loginStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={loginStyle.eyeSx} />
                )}
              </IconButton>
            }
          />
        </Box>
        <Typography sx={loginStyle?.ForgotSx} onClick={() => navigate(webRoutes.forgotpassword)}>
          Forgot Password ?
        </Typography>
        <Box>
          <Button fullWidth sx={loginStyle.loginButtonSx} onClick={() => signInHIt()} loading={loading}>
            login
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={loginStyle.loginSx}>If you dont have an account already?</Typography>
          <Link
            style={{
              color: '#353448',
              fontWeight: '600',
              textDecoration: 'underline',
              paddingLeft: '5px',
              fontSize: '14px',
            }}
            to={webRoutes.signup}
          >
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
