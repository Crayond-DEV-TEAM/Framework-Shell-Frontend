import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { sideBarIdmLayoutStyle } from './style';
import { SideBarIdm } from '..';
import { AppBar } from '@atoms/appBar';
import { useUser } from '@core/store';

export interface SideBarIdmLayoutProps {
  className?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
  paddingElement?: any;
}

export const SideBarIdmLayout = (props: SideBarIdmLayoutProps): JSX.Element => {
  const { className = '', sx = {}, children, childrenWrapperProps = {}, paddingElement = {}, ...rest } = props;
  const user = useUser((state) => state.user);

  return (
    <Box
      sx={[
        {
          ...sideBarIdmLayoutStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <AppBar user={user} title={'IDM'} />
      <SideBarIdm />
      {/* Children */}
      <Box
        sx={[
          {
            ...sideBarIdmLayoutStyle.childrenSx,
            paddingElement,
          },
          ...(Array.isArray(childrenWrapperProps['sx']) ? childrenWrapperProps['sx'] : [childrenWrapperProps['sx']]),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
};
