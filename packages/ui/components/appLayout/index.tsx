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
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
}

export function AppLayout(props: AppLayoutProps): JSX.Element {
  const { className = '', children, childrenWrapperProps = {}, sx = {}, ...rest } = props;
  //store data
  const { sideMenus } = useMenu((state) => ({
    sideMenus: state.sideMenus,
  }));

  const [title, setTitle] = useState();

  const menuItems = (item: any, index: any) => {
    setTitle(item?.menuName);
  };

  const user = useUser((state) => state.user);

  // useEffect(() => {
  //   setTitle(sideMenus?.[0]?.menuName);
  // }, []);

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
      <SideBar menuItems={menuItems} />
      {/* Children */}
      <Box
        sx={[
          {
            ...appLayoutStyle.childrenSx,
          },
          ...(Array.isArray(childrenWrapperProps['sx']) ? childrenWrapperProps['sx'] : [childrenWrapperProps['sx']]),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
