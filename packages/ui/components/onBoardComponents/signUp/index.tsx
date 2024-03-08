import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useAuth } from '@core/store/framework-shell';
import { Alert, SxProps, Theme } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { signUpStyle } from './style';

export interface SignUpProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SignUp = forwardRef((props: SignUpProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchParams] = useSearchParams();
  // Store Data
  const { signUpState, signUpLoading, signUpError, signUpMessage, setSignUpState, signUp, clearAll } = useAuth();

  // General Hooks
  const [showpassword, setPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setPassword(!showpassword);

  const signUpHit = async () => signUp(searchParams.get('token'));

  const handleChange = (key: string, value: string) => {
    if (key === 'mobile' && value.length > 10) {
      return false;
    }
    setSignUpState({ key, value });
  };

  useEffect(() => {
    clearAll();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={[{ ...signUpStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={signUpStyle.cardContentSx}>
        <Typography sx={signUpStyle.createPasswordSx}>Welcome to Toolkit</Typography>

        {/* First Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="firstName">
            First name
          </Label>
          <Input
            size="small"
            value={signUpState?.firstName ?? ''}
            id="firstName"
            placeholder="First Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('firstName', e.target.value)
            }
            isError={signUpState?.error?.firstName?.length ? true : false}
            errorMessage={signUpState?.error?.firstName}
          />
        </Box>
        {/* Last Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="lastName">
            Last name
          </Label>
          <Input
            size="small"
            value={signUpState?.lastName ?? ''}
            id="lastName"
            placeholder="Last Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('lastName', e.target.value)
            }
            isError={signUpState?.error?.lastName?.length ? true : false}
            errorMessage={signUpState?.error.lastName}
          />
        </Box>
        {/* Email ID */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="emailId">
            Email ID
          </Label>
          <Input
            size="small"
            value={signUpState?.emailId ?? ''}
            id="emailId"
            placeholder="Email Id"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('emailId', e.target.value)
            }
            isError={signUpState?.error?.emailId?.length ? true : false}
            errorMessage={signUpState?.error?.emailId}
          />
        </Box>
        {/* Mobile */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="number">
            Mobile
          </Label>
          <Input
            type="number"
            size="small"
            value={signUpState?.mobile ?? ''}
            id="mobile"
            placeholder="Mobile"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('mobile', e.target.value)
            }
            isError={signUpState?.error?.mobile?.length ? true : false}
            errorMessage={signUpState?.error.mobile}
          />
        </Box>
        {/* User Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            User Name
          </Label>
          <Input
            size="small"
            value={signUpState?.username ?? ''}
            id="username"
            placeholder="Username"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('username', e.target.value)
            }
            isError={signUpState?.error?.username?.length ? true : false}
            errorMessage={signUpState?.error?.username}
          />
        </Box>

        {/* Set password */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="password" isRequired>
            New password
          </Label>
          <Input
            id="password"
            type={showpassword ? 'text' : 'password'}
            value={signUpState?.password ?? ''}
            size="small"
            placeholder="Set Password"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('password', e.target.value)
            }
            endAdornment={
              <IconButton onClick={() => handleClickShowPassword()} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={signUpStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={signUpStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={signUpState?.error?.password?.length ? true : false}
            errorMessage={signUpState?.error.password}
          />
        </Box>

        {/* Confirm password */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="password" isRequired>
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            type={showpassword ? 'text' : 'password'}
            value={signUpState?.confirmPassword ?? ''}
            size="small"
            placeholder="Confirm Password"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('confirmPassword', e.target.value)
            }
            endAdornment={
              <IconButton onClick={() => handleClickShowPassword()} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={signUpStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={signUpStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={signUpState?.error?.confirmPassword?.length ? true : false}
            errorMessage={signUpState?.error.confirmPassword}
          />
        </Box>

        {/* Sign Up Button */}
        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={signUpStyle.loginButtonSx} onClick={() => signUpHit()} loading={signUpLoading}>
            sign up
          </Button>
        </Box>

        {/* Message */}
        {signUpMessage.length > 0 && (
          <Box mt={2}>
            <Alert severity={signUpError ? 'error' : 'success'}>{signUpMessage}</Alert>
          </Box>
        )}

        {/* Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, justifyContent: 'center', cursor: 'pointer' }}>
          {/* <Typography sx={signUpStyle.loginSx}>Back To login</Typography> */}
          <Link
            style={{
              color: '#255448',
              fontWeight: '600',
              textDecoration: 'underline',
              paddingLeft: '5px',
              fontSize: '14px',
            }}
            to={webRoutes.login}
          >
            Back To login
          </Link>
        </Box>
      </Box>
    </Box>
  );
});

SignUp.displayName = 'SignUp';
