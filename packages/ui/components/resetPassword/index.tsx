import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store';
import { localStorageKeys, parseJwt } from '@core/utils';
import { IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';

import { resetPasswordStyle } from './style';

export interface ResetPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
}

export const ResetPassword = forwardRef((props: ResetPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', title = 'Reset Password', sx = {}, ...rest } = props;
  const authToken = localStorage.getItem(localStorageKeys.authToken);
  const data = parseJwt(authToken);
  console.log(data, 'data');

  const { user, setUser, resetPassword, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      resetPassword: state.resetPassword,
      user: state.userState,
      setUser: state.setUser,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );
  // General Hooks
  const [showpassword, setPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [values, setValues] = useState(user);

  const isInputsValid = () => {
    let isValid = true;
    const error = values?.error;

    // Checking password
    if (values.password.length === 0) {
      isValid = false;
      error.password = 'New Password is required';
    } else {
      error.password = '';
    }

    if (values.password.length < 8) {
      isValid = false;
      error.password = 'Password must be at least 8 characters long';
    } else if (!values.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)) {
      isValid = false;
      error.password = 'Password must contain uppercase and lowercase letters, numbers, and special characters';
    } else {
      error.password = '';
    }

    // Checking Confirm password
    if (values.confirmPassword.length === 0) {
      isValid = false;
      error.confirmPassword = ' Confirm password is required';
    } else {
      error.confirmPassword = '';
    }
    if (values?.confirmPassword.length > 0 && values.password !== values.confirmPassword) {
      isValid = false;
      error.confirmPassword = 'password does not matching';
    }
    setValues({ ...values, error });

    return isValid;
  };

  const handleChange = (key: any, val: any) => {
    setValues({ ...values, [key]: val, error: { ...values.error, [key]: '' } });
  };

  const resetPasswordFunc = async () => {
    if (isInputsValid()) {
      const error = values?.error;
      error.password = '';
      error.confirmPassword = '';
      setValues({ ...values, error });
      // calling the resetPassword api
      const response: any = await resetPassword(values);
      if (response === 200) {
        setValues({
          ...values,
          password: '',
          confirmPassword: '',
          error: {
            ...user?.error,
            password: '',
            confirmPassword: '',
          },
        });
      }
    }
  };

  useEffect(() => {
    setUser({
      ...user,
      error: {
        password: '',
        confirmPassword: '',
      },
    });
    return setValues({
      ...user,
      error: {
        ...user.error,
        password: '',
        confirmPassword: '',
      },
    });
  }, []);

  return (
    <Box
      sx={[
        {
          ...resetPasswordStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={resetPasswordStyle.cardContentSx}>
        <Typography sx={resetPasswordStyle.signInSx}>{title}</Typography>
        <Typography sx={resetPasswordStyle.provideSx}>Please Initialy reset your password.</Typography>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            New Password
          </Label>
          <Input
            id="password"
            type={showpassword ? 'text' : 'password'}
            value={values?.password ?? ''}
            placeholder="New password"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('password', e.target.value)
            }
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPassword((prevState) => !prevState)}
                edge="end"
              >
                {showpassword ? (
                  <VisibilityOff rootStyle={resetPasswordStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={resetPasswordStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={values?.error?.password ? true : false}
            errorMessage={values?.error?.password ?? ''}
          />
        </Box>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={values?.confirmPassword ?? ''}
            size="small"
            placeholder="Confirm Password"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('confirmPassword', e.target.value)
            }
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOff rootStyle={resetPasswordStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={resetPasswordStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={values?.error?.confirmPassword ? true : false}
            errorMessage={values?.error?.confirmPassword ?? ''}
          />
        </Box>
        <Box>
          <Button onClick={() => resetPasswordFunc()} fullWidth sx={resetPasswordStyle.loginButtonSx}>
            Reset
          </Button>
        </Box>
        <Box sx={resetPasswordStyle?.bottomLineSx}>
          <Typography sx={resetPasswordStyle?.alreadySx}>Remembered the password? </Typography>
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
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
});

ResetPassword.displayName = 'ResetPassword';
