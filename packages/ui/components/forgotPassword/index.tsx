import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useAuth } from '@core/store/framework-shell';
import { Alert, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordStyle } from './style';

export interface ForgotPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ForgotPassword = forwardRef((props: ForgotPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const {
    forgotPasswordState,
    forgotPasswordMessage,
    forgotPasswordLoading,
    forgotPasswordError,
    forgotPassword,
    setForgotPasswordState,
    clearAll,
  } = useAuth();

  const handleChange = (key: string, value: string) => setForgotPasswordState({ key, value });

  const getLink = () => forgotPassword();

  useEffect(() => {
    clearAll();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={[{ ...forgotPasswordStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
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
            placeholder="Email ID"
            value={forgotPasswordState.email_id}
            id="emailId"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('email_id', e.target.value)
            }
          />
        </Box>

        <Box sx={{ mt: 2, display: 'grid', gap: 3 }}>
          <Button
            fullWidth
            sx={forgotPasswordStyle.loginButtonSx}
            onClick={() => getLink()}
            loading={forgotPasswordLoading}
          >
            Get Link
          </Button>
        </Box>

        {/* Message */}
        {forgotPasswordMessage.length > 0 && (
          <Box mt={2}>
            <Alert severity={forgotPasswordError ? 'error' : 'success'}>{forgotPasswordMessage}</Alert>
          </Box>
        )}

        <Box mt={2}>
          <Typography sx={forgotPasswordStyle.loginSx}>
            Remembered the password?
            <Link
              style={{ color: '#353448', fontWeight: '600', textDecoration: 'underline', paddingLeft: '5px' }}
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
