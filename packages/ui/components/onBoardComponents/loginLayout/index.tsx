import { webRoutes } from '@core/routes';
import { localStorageKeys, parseJwt } from '@core/utils';
import { BoxProps, SxProps, Theme, Typography } from '@mui/material';
import { Box, Grid } from '@mui/material';
import React, { forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import crayond from '../../assets/crayond.svg';
import crayond from '@assets/crayond.svg';
import login from '@assets/login.svg';
import toolkit from '@assets/toolkit.svg';
import { loginLayoutStyle } from './style';
import { useUser } from '@core/store';
import packageJson from '../../../../../package.json';

export interface LoginLayoutProps {
  className?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
}

export const LoginLayout = forwardRef((props: LoginLayoutProps): JSX.Element => {
  const { className = '', children, childrenWrapperProps = {}, sx = {}, ...rest } = props;

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const authToken = localStorage.getItem(localStorageKeys?.authToken);

    //Already logged in
    if (authToken) {
      const user = parseJwt(authToken);
      useUser.setState({ user });
      if (user.isSuperAdmin === true) {
        navigate(webRoutes.superAdmin);
        //  window.location.href = '/superAdmin';
      } else {
        // navigate(webRoutes.admin)
        // window.location.href = '/admin';
      }
      // navigate(webRoutes.ad);
    }
  }, [location]);

  const appVersion = packageJson.version;

  const handleRoute = () => {
    navigate(webRoutes.signup);
  };

  return (
    <Box sx={[{ ...loginLayoutStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]} className={`${className}`} {...rest}>
      <Box sx={loginLayoutStyle?.toolkit}>
        <Box component={'img'} sx={{ width: '40px', height: '40px' }} src={toolkit} />
        <Typography sx={loginLayoutStyle.toolkitText}>Toolkit</Typography>
        <Typography sx={loginLayoutStyle.version}>(v:{appVersion})</Typography>
      </Box>

      <Grid container>
        {/* <Hidden only={['xs', 'sm']}> */}
        <Grid item xs={12} sm={6} md={6} xl={6} alignItems="center" sx={loginLayoutStyle.imgSecSx}>
          <Box component={'img'} src={login} height={'315px'} width={'285px'} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} sx={loginLayoutStyle?.formSx}>
          <Box
            sx={{
              ...loginLayoutStyle.childrenSx,

              ...(Array.isArray(childrenWrapperProps['sx'])
                ? childrenWrapperProps['sx']
                : [childrenWrapperProps['sx']]),
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={loginLayoutStyle?.toolkitBottom}>
          <Box component={'img'} src={crayond} sx={loginLayoutStyle.bottomImgSx} />
          <Typography sx={loginLayoutStyle?.power}>Powered by Crayon&apos;d</Typography>
        </Box>
        {location.pathname === '/login' ? (
          <Box onClick={handleRoute}>
            <Typography sx={loginLayoutStyle?.onboardButton}>// Onboarding Flow</Typography>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
});

LoginLayout.displayName = 'LoginLayout';
