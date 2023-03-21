import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useOnboarding } from '@core/store';
import { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { forwardRef } from 'react';
import isEqual from 'react-fast-compare';
import { useNavigate } from 'react-router-dom';

import { resetPasswordStyle } from './style';

export interface ResetPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
}

export const ResetPassword = forwardRef((props: ResetPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', title = 'Reset Password', sx = {}, ...rest } = props;
  const navigate = useNavigate();
  const { user, reset, loading, handleLoginChange } = useOnboarding(
    (state) => ({
      reset: state.reset,
      user: state.userState,
      handleLoginChange: state.handleLoginChange,
      loading: state.loading,
    }),
    (prev, curr) => isEqual(prev, curr),
  );

  const isIamValideToCreateAccount = () => {
    let isValid = true;
    const error = user.error;

    // const is_password_strong_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    // const is_password_strong = is_password_strong_regex.test(user.setPassword);

    // //Checking enterPassword
    // if (user.setPassword.length === 0) {
    //   isValid = false;
    //   error.setPassword = 'Please Enter Password';
    // }

    // //Checking confirmPassword
    // if (user.confirmPassword.length === 0) {
    //   isValid = false;
    //   error.confirmPassword = 'Please Enter Confirm Password';
    // }

    if (user.confirmPassword.length > 0) {
      if (user.setPassword.length > 0 && user.setPassword !== user.confirmPassword) {
        isValid = false;
        error.confirmPassword = enqueueSnackbar(`Password does not match`, {
          variant: 'error',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        });
      }
    }
    if (user.setPassword !== '' && user.confirmPassword !== '') {
      if (user.setPassword === user.confirmPassword) {
        isValid = true;
      }
    }

    //Checking enterPassword
    // if (user.setPassword.length === 0) {
    //   isValid = false;
    //   error.setPassword = 'Please Enter Password';
    // } else if (!is_password_strong) {
    //   isValid = false;
    //   error.setPassword = 'Please Enter stong';
    // }
    // ;
    return isValid;
  };
  const onSendAccountBtnClicked = () => {
    if (isIamValideToCreateAccount()) {
      reset();
    }
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
            id="setPassword"
            type={'password'}
            errorMessage={user?.error.setPassword}
            // isError={user.error.setPassword.length > 0}
            value={user?.setPassword ?? ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('setPassword', e.target.value)
            }
            // isError={account.error.enterPassword.length > 0}
            // errorMessage={account.error.enterPassword}
            // value={account?.enterPassword ?? ''}
            size="small"
          />
        </Box>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={'password'}
            //errorMessage={user?.error.password}
            //value={user?.password ?? ''}
            // isError={user.error.confirmPassword.length > 0}
            errorMessage={user.error.confirmPassword}
            value={user?.confirmPassword ?? ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleLoginChange('confirmPassword', e.target.value)
            }
            size="small"
          />
        </Box>
        <Box>
          <Button fullWidth sx={resetPasswordStyle.loginButtonSx} onClick={onSendAccountBtnClicked} loading={loading}>
            Reset
          </Button>
        </Box>
        <Box sx={resetPasswordStyle?.bottomLineSx}>
          <Typography sx={resetPasswordStyle?.alreadySx}>Remembered the password? </Typography>
          <Typography sx={resetPasswordStyle?.signup} onClick={() => navigate(webRoutes?.login)}>
            Log in
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

ResetPassword.displayName = 'ResetPassword';
