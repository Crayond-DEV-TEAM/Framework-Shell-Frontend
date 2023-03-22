import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import { IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React from 'react';
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

  const { user, signIn, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      signIn: state.signIn,
      user: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );
  const [showpassword, setPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setPassword(!showpassword);
  };

  const signInHIt = () => {
    signIn();
  };

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
            type={showpassword ? 'password' : 'text'}
            errorMessage={user?.error.password}
            value={user?.password ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('password', e.target.value)
            }
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
