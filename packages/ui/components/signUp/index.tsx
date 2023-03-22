import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { forwardRef } from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';
import { signUpStyle } from './style';

export interface SignUpProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SignUp = forwardRef((props: SignUpProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const { userState, signUp, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      signUp: state.signUp,
      userState: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );

  // General Hooks
  const [showpassword, setPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setPassword(!showpassword);
  };

  const signUpHit = () => {
    signUp();
  };

  return (
    <Box
      sx={[
        {
          ...signUpStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={signUpStyle.cardContentSx}>
        <Typography sx={signUpStyle.createPasswordSx}>Sign Up</Typography>
        {/* First Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="firstName">
            First name
          </Label>
          <Input
            size="small"
            value={userState?.firstName ?? ''}
            id="firstName"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('firstName', e.target.value)
            }
            // isError={userState?.error.firstName !== ''}
            isError={userState?.error?.firstName?.length > 0}
            errorMessage={userState?.error?.firstName}
          />
        </Box>
        {/* Last Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="lastName">
            Last name
          </Label>
          <Input
            size="small"
            value={userState?.lastName ?? ''}
            id="lastName"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('lastName', e.target.value)
            }
            isError={userState?.error?.lastName.length > 0}
            errorMessage={userState?.error.lastName}
          />
        </Box>
        {/* Email ID */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="emailId">
            Email ID
          </Label>
          <Input
            size="small"
            value={userState?.emailId ?? ''}
            id="emailId"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('emailId', e.target.value)
            }
            isError={userState?.error?.emailId?.length > 0}
            errorMessage={userState?.error?.emailId}
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
            value={userState?.mobile ?? ''}
            id="mobile"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('mobile', e.target.value)
            }
            isError={userState?.error?.mobile?.length > 0}
            errorMessage={userState?.error.mobile}
          />
        </Box>
        {/* User Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            User Name
          </Label>
          <Input
            size="small"
            value={userState?.username ?? ''}
            id="username"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('username', e.target.value)
            }
            isError={userState?.error?.username?.length > 0}
            errorMessage={userState?.error?.username}
          />
        </Box>
        {/* Set password */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="password" isRequired>
            Set password
          </Label>
          <Input
            id="setPassword"
            type={showpassword ? 'text' : 'password'}
            value={userState?.setPassword ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('setPassword', e.target.value)
            }
            endAdornment={
              <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={signUpStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={signUpStyle.eyeSx} />
                )}
              </IconButton>
            }
            isError={userState?.error?.setPassword?.length > 0}
            errorMessage={userState?.error.setPassword}
          />
        </Box>
        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={signUpStyle.loginButtonSx} onClick={() => signUpHit()} loading={loading}>
            sign up
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, justifyContent: 'center' }}>
          <Typography sx={signUpStyle.loginSx}>If you ve an account already?</Typography>
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
            Log In
          </Link>
        </Box>
      </Box>
    </Box>
  );
});

SignUp.displayName = 'SignUp';
