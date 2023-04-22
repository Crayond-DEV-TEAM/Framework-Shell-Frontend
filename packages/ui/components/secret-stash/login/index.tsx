import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { environmentRoutes, webRoutes } from '@core/routes';
import { useAuth } from '@core/store/framework-shell';
import { Alert, IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginStyle } from './style';
import { EnvironmentTabs } from '@components/environmentTabs';
import { useAuthLogin } from '@core/store';

export interface LoginProps {
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export function Login(props: LoginProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;

  const navigate = useNavigate();

  const { SecretStashSignInState, setSignInState, signIn, signInMessage, signInError } = useAuthLogin();

  console.log(signInMessage, 'SecretStashSignInState');

  const [showpassword, setPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setPassword(!showpassword);

  const handleChange = (key: string, value: string) => setSignInState({ key, value });

  const signInHIt = async () => signIn();

  useEffect(() => {
    // clearAll();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={[{ ...loginStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]} className={`${className}`} {...rest}>
      <Box sx={loginStyle.cardContentSx}>
        <Typography sx={loginStyle.signInSx}>Sign In</Typography>

        {/* Username */}
        <Box sx={loginStyle.inputGroupSx}>
          <Label sx={loginStyle.labelSx} htmlFor="username">
            Username
          </Label>
          <Input
            size="small"
            placeholder="username"
            value={SecretStashSignInState.user_name}
            id="user_name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('user_name', e.target.value)
            }
          />
        </Box>

        {/* Password */}
        <Box sx={loginStyle.inputGroupSx}>
          <Label sx={loginStyle.labelSx} htmlFor="password" isRequired>
            password?
          </Label>
          <Input
            id="password"
            type={showpassword ? 'text' : 'password'}
            value={SecretStashSignInState.password}
            placeholder="password"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('password', e.target.value)
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

        {/* For Forgot Password */}
        <Typography sx={loginStyle?.ForgotSx} onClick={() => navigate(environmentRoutes?.forgotpassword)}>
          Forgot Password ?
        </Typography>

        {/* Login Button */}
        <Box>
          <Button fullWidth sx={loginStyle.loginButtonSx} onClick={() => signInHIt()}>
            Login
          </Button>
        </Box>

        {/* Message */}
        {signInMessage.length > 0 && (
          <Box mt={2}>
            <Alert severity={signInError ? 'error' : 'success'}>{signInMessage}</Alert>
          </Box>
        )}

        {/* For Sign Up */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} mt={2}>
          <Typography sx={loginStyle.loginSx}>If you dont have an account already?</Typography>
          <Typography
            sx={{ ...loginStyle?.ForgotSx, pt: 0, ml: 0.5 }}
            onClick={() => navigate(environmentRoutes?.signup)}
          >
            Sign Up
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
