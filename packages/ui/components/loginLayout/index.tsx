import type { BoxProps, SxProps, Theme } from '@mui/material';
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
      <Box component={'img'} src={toolkit} />

      <Grid container>
        {/* <Hidden only={['xs', 'sm']}> */}
        <Grid item xs={12} sm={6} md={6} xl={6} justifyContent={'center'} sx={loginLayoutStyle?.imgSecSx}>
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

      <Box component={'img'} src={crayond} sx={loginLayoutStyle.bottomImgSx} />
    </Box>
  );
});

LoginLayout.displayName = 'LoginLayout';
