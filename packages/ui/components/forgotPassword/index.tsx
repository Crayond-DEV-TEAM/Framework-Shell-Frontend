import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';

import { forgotPasswordStyle } from './style';
import { ValidateEmail } from '@core/utils';

export interface ForgotPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ForgotPassword = forwardRef((props: ForgotPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const { user, forgotPassword, loading, setUser, handleLoginChange } = useOnboarding(
    (state) => ({
      forgotPassword: state.forgotPassword,
      setUser: state.setUser,
      user: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );
  const [values, setValues] = useState(user);

  const isInputsValid = () => {
    let isValid = true;
    const error = values?.error;

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
    setValues({ ...values, error });
    return isValid;
  };

  const handleChange = (key: any, val: any) => {
    setValues({ ...values, [key]: val, error: { ...values.error, [key]: '' } });
  };

  const getLink = async () => {
    if (isInputsValid()) {
      const error = values?.error;
      error.emailId = '';
      setValues({ ...values, error });
      // calling the forgotPassword api
      const response: any = await forgotPassword(values);
      if (response === 200) {
        setValues({
          ...values,
          emailId: '',
          error: {
            ...user?.error,
            emailId: '',
          },
        });
      }
    }
  };

  useEffect(() => {
    setUser({
      ...user,
      error: {
        emailId: '',
      },
    });
    return setValues({
      ...user,
      error: {
        ...user.error,
        emailId: '',
      },
    });
  }, []);

  return (
    <Box
      sx={[
        {
          ...forgotPasswordStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={forgotPasswordStyle.cardContentSx}>
        <Typography sx={forgotPasswordStyle.createPasswordSx}>Forgot Password</Typography>

        <Typography sx={forgotPasswordStyle.subTileSx}>
          Provide us the registered email to reset your password.
        </Typography>

        {/* Email ID */}
        <Box sx={forgotPasswordStyle.inputGroupSx}>
          <Label rootStyle={forgotPasswordStyle.labelSx} htmlFor="emailId">
            Email ID
          </Label>
          <Input
            size="small"
            value={values?.emailId ?? ''}
            id="emailId"
            isError={values?.error?.emailId?.length ? true : false}
            errorMessage={values?.error?.emailId ?? ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('emailId', e.target.value)
            }
          />
        </Box>

        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={forgotPasswordStyle.loginButtonSx} onClick={() => getLink()} loading={loading}>
            Get Link
          </Button>
        </Box>

        <Box sx={{ paddingTop: '16px' }}>
          <Typography sx={forgotPasswordStyle.loginSx}>
            Remembered the password?
            <Link
              style={{
                color: '#353448',
                fontWeight: '600',
                textDecoration: 'underline',
                paddingLeft: '5px',
              }}
              to={webRoutes.login}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

ForgotPassword.displayName = 'ForgotPassword';
