import { BoxProps, SxProps, Theme, Typography } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { forwardRef } from 'react';

import crayond from '../../assets/crayond.svg';
import login from '../../assets/login.svg';
import toolkit from '../../assets/toolkit.svg';
import { loginLayoutStyle } from './style';

export interface LoginLayoutProps {
  className?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
}

export const LoginLayout = forwardRef((props: LoginLayoutProps): JSX.Element => {
  const { className = '', children, childrenWrapperProps = {}, sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...loginLayoutStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={loginLayoutStyle?.toolkit}>
        <Box component={'img'} sx={{ width: '40px', height: '40px' }} src={toolkit} />
        <Typography sx={loginLayoutStyle.toolkitText}>Toolkit</Typography>
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

      <Box sx={loginLayoutStyle?.toolkitBottom}>
        <Box component={'img'} src={crayond} sx={loginLayoutStyle.bottomImgSx} />
        <Typography sx={loginLayoutStyle?.power}>Powered by Crayon&apos;d</Typography>
      </Box>
    </Box>
  );
});

LoginLayout.displayName = 'LoginLayout';
