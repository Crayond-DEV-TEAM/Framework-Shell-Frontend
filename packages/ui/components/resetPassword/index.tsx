import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useOnboarding } from '@core/store';
import { localStorageKeys, parseJwt } from '@core/utils';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import isEqual from 'react-fast-compare';

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

  const { user, resetPassword, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      resetPassword: state.resetPassword,
      user: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );
  const resetPasswordFunc = () => {
    resetPassword();
  };
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
            type={'password'}
            //errorText={user?.error.password ?? ''}
            //errorMessage={user?.error.password}
            value={user?.password ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('password', e.target.value)
            }
          />
        </Box>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={'password'}
            //errorText={user?.error.password ?? ''}
            //errorMessage={user?.error.password}
            value={user?.confirmPassword ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('confirmPassword', e.target.value)
            }
          />
        </Box>
        <Box>
          <Button onClick={() => resetPasswordFunc()} fullWidth sx={resetPasswordStyle.loginButtonSx}>
            Reset
          </Button>
        </Box>
        <Box sx={resetPasswordStyle?.bottomLineSx}>
          <Typography sx={resetPasswordStyle?.alreadySx}>Remembered the password? </Typography>
          <Typography sx={resetPasswordStyle?.signup}>Log in</Typography>
        </Box>
      </Box>
    </Box>
  );
});

ResetPassword.displayName = 'ResetPassword';
