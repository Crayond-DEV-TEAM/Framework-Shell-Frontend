import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { resetPasswordStyle } from './style';

export interface ResetPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
}

export const ResetPassword = forwardRef((props: ResetPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', title = 'Reset Password', sx = {}, ...rest } = props;

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
            //value={user?.password ?? ''}
            size="small"
          />
        </Box>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            Confirm Password
          </Label>
          <Input
            id="password"
            type={'password'}
            //errorText={user?.error.password ?? ''}
            //errorMessage={user?.error.password}
            //value={user?.password ?? ''}
            size="small"
          />
        </Box>
        <Box>
          <Button fullWidth sx={resetPasswordStyle.loginButtonSx}>
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
