import { AppBar } from '@atoms/appBar';
import { SideBar } from '@atoms/sideBar';
import { useUser } from '@core/store/framework-shell/user';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';

import { appLayoutStyle } from './style';
import { useEffect, useState } from 'react';
import { useMenu } from '@core/store';

export interface AppLayoutProps {
  className?: string;
  title?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
  paddingElement?: any;
}

export function AppLayout(props: AppLayoutProps): JSX.Element {
  const {
    className = '',
    title = '',
    children,
    childrenWrapperProps = {},
    sx = {},
    paddingElement = {},
    ...rest
  } = props;

  const user = useUser((state) => state.user);

  return (
    <Box
      sx={[
        {
          ...appLayoutStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <AppBar user={user} title={title} />
      <SideBar />
      {/* Children */}
      <Box
        sx={[
          {
            ...appLayoutStyle.childrenSx,
            paddingElement,
          },
          ...(Array.isArray(childrenWrapperProps['sx']) ? childrenWrapperProps['sx'] : [childrenWrapperProps['sx']]),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
