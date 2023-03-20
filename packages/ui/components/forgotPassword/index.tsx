import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';

import { forgotPasswordStyle } from './style';

export interface ForgotPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ForgotPassword = forwardRef((props: ForgotPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { user, signIn, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      signIn: state.signIn,
      user: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );
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
            value={user?.emailId ?? ''}
            id="emailId"
            errorText={user?.error.emailId ?? false}
            helperText={user?.error.emailId}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('emailId', e.target.value)
            }
          />
        </Box>

        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={forgotPasswordStyle.loginButtonSx} onClick={() => signIn()} loading={loading}>
            sign up
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
