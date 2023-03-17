import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import isEqual from 'react-fast-compare';
import { useNavigate } from 'react-router-dom';

import { loginStyle } from './style';

export interface LoginProps {
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export function Login(props: LoginProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;
  const navigate = useNavigate();
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
            value={user?.username ?? ''}
            id="username"
            errorText={user?.error.username ?? false}
            helperText={user?.error.username}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('username', e.target.value)
            }
          />
        </Box>
        <Box sx={loginStyle.inputGroupSx}>
          <Label sx={loginStyle.labelSx} htmlFor="password" isRequired>
            password?
          </Label>
          <Input
            id="password"
            type={'password'}
            errorText={user?.error.password ?? ''}
            errorMessage={user?.error.password}
            value={user?.password ?? ''}
            size="small"
          />
        </Box>
        <Typography sx={loginStyle?.ForgotSx} onClick={() => navigate(webRoutes.forgotpassword)}>
          Forgot Password
        </Typography>
        <Box>
          <Button fullWidth sx={loginStyle.loginButtonSx} onClick={() => signIn()} loading={loading}>
            login
          </Button>
        </Box>
        <Box sx={loginStyle?.bottomLineSx}>
          <Typography sx={loginStyle?.alreadySx}>If you dont have an account already?</Typography>
          <Typography sx={loginStyle?.signup} onClick={() => navigate(webRoutes.signup)}>
            Sign Up
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
