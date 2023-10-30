import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { sidebarLayoutStyle } from './style';
import { SideBarPlan } from '@atoms/sideBarPlan';

export interface SidebarLayoutProps {
  className?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children: JSX.Element;
  paddingElement?: any;
}

export const SidebarLayout = (props: SidebarLayoutProps): JSX.Element => {
  const { className = '', sx = {}, children, childrenWrapperProps = {}, paddingElement = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...sidebarLayoutStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <SideBarPlan />
      {/* Children */}
      <Box
        sx={[
          {
            ...sidebarLayoutStyle.childrenSx,
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
