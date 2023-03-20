// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store/framework-shell';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { forwardRef } from 'react';
import isEqual from 'react-fast-compare';
import { useNavigate } from 'react-router-dom';

import { signUpStyle } from './style';

export interface SignUpProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SignUp = forwardRef((props: SignUpProps): JSX.Element => {
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

  const [
    showpassword,
    // setPassword
  ] = useState<boolean>(false);
  // const handleClickShowPassword = () => {
  //   setPassword(!showpassword);
  // };

  return (
    <Box
      sx={[
        {
          ...signUpStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={signUpStyle.cardContentSx}>
        <Typography sx={signUpStyle.createPasswordSx}>Sign Up</Typography>
        {/* First Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            First name
          </Label>
          <Input
            size="small"
            value={user?.firstName ?? ''}
            id="firstName"
            errorText={user?.error.firstName ?? false}
            helperText={user?.error.firstName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('firstName', e.target.value)
            }
          />
        </Box>
        {/* Last Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            Last name
          </Label>
          <Input
            size="small"
            value={user?.lastName ?? ''}
            id="lastName"
            errorText={user?.error.lastName ?? false}
            helperText={user?.error.lastName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('lastName', e.target.value)
            }
          />
        </Box>
        {/* Email ID */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="emailId">
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
        {/* Mobile */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            Mobile
          </Label>
          <Input
            type="number"
            size="small"
            value={user?.mobile ?? ''}
            id="mobile"
            errorText={user?.error.mobile ?? false}
            helperText={user?.error.mobile}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('mobile', e.target.value)
            }
          />
        </Box>
        {/* User Name */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="username">
            User Name
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
        {/* Set password */}
        <Box sx={signUpStyle.inputGroupSx}>
          <Label rootStyle={signUpStyle.labelSx} htmlFor="password" isRequired>
            Set password
          </Label>
          <Input
            id="setPassword"
            type={showpassword ? 'text' : 'password'}
            errorText={user?.error.setPassword ?? ''}
            errorMessage={user?.error.setPassword}
            value={user?.setPassword ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('setPassword', e.target.value)
            }
            // endAdornment={
            //   <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword()} edge="end">
            //     {showpassword ? (
            //       <VisibilityOffIcon htmlColor="#848484" sx={signUpStyle.eyeSx} />
            //     ) : (
            //       <RemoveRedEyeIcon htmlColor="#848484" sx={signUpStyle.eyeSx} />
            //     )}
            //   </IconButton>
            // }
          />
        </Box>
        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          <Button fullWidth sx={signUpStyle.loginButtonSx} onClick={() => signIn()} loading={loading}>
            sign up
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 3, justifyContent: 'center' }}>
          <Typography sx={signUpStyle.loginSx}>If you ve an account already?</Typography>
          <Typography sx={signUpStyle?.signup} onClick={() => navigate(webRoutes.login)}>
            Log In
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

SignUp.displayName = 'SignUp';
