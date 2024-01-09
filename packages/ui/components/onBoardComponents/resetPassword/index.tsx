import { Button } from '@atoms/button';
import { Visibility, VisibilityOff } from '@atoms/icons';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { webRoutes } from '@core/routes';
import { useAuth } from '@core/store';
import { Alert, IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPasswordStyle } from './style';

export interface ResetPasswordProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
}

export const ResetPassword = forwardRef((props: ResetPasswordProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', title = 'Reset Password', sx = {}, ...rest } = props;

  const [searchParams] = useSearchParams();

  const {
    resetPasswordState,
    resetPasswordLoading,
    resetPasswordError,
    resetSuccess,
    resetPasswordMessage,
    resetPassword,
    setRestPasswordState,
    clearAll,
  } = useAuth();

  const [showpassword, setPassword] = useState<boolean>(false);

  const handleChange = (key: string, value: string) => setRestPasswordState({ key, value });

  const resetPasswordFunc = () => resetPassword(searchParams.get('token') );

  useEffect(() => {
    clearAll();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={[{ ...resetPasswordStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
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
            type={showpassword ? 'text' : 'password'}
            value={resetPasswordState.password}
            placeholder="New password"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('password', e.target.value)
            }
            endAdornment={
              <IconButton onClick={() => setPassword((prevState) => !prevState)} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={resetPasswordStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={resetPasswordStyle.eyeSx} />
                )}
              </IconButton>
            }
          />
        </Box>
        <Box sx={resetPasswordStyle.inputGroupSx}>
          <Label sx={resetPasswordStyle.labelSx} htmlFor="password" isRequired>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showpassword ? 'text' : 'password'}
            value={resetPasswordState.confirmPassword}
            size="small"
            placeholder="Confirm Password"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('confirmPassword', e.target.value)
            }
            endAdornment={
              <IconButton onClick={() => setPassword((prevState) => !prevState)} edge="end">
                {showpassword ? (
                  <VisibilityOff rootStyle={resetPasswordStyle.eyeSx} />
                ) : (
                  <Visibility rootStyle={resetPasswordStyle.eyeSx} />
                )}
              </IconButton>
            }
          />
        </Box>
        <Box>
          <Button
            loading={resetPasswordLoading}
            disabled={resetSuccess}
            onClick={() => resetPasswordFunc()}
            fullWidth
            sx={resetPasswordStyle.loginButtonSx}
          >
            Reset
          </Button>
        </Box>

        {/* Message */}
        {resetPasswordMessage.length > 0 && (
          <Box mt={2}>
            <Alert severity={resetPasswordError ? 'error' : 'success'}>{resetPasswordMessage}</Alert>
          </Box>
        )}

        <Box sx={resetPasswordStyle?.bottomLineSx}>
          <Typography sx={resetPasswordStyle?.alreadySx}>Remembered the password? </Typography>
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

ResetPassword.displayName = 'ResetPassword';
