import type { BoxProps, SxProps, Theme } from '@mui/material';
import { useUser } from '@core/store/framework-shell/user';
import { Box, Typography } from '@mui/material';

import { greetingStyles } from './style';

export interface GreetingProps {
  className?: string;
  title?: string;
  sx?: SxProps<Theme>;
  childrenWrapperProps?: BoxProps;
  children?: JSX.Element;
  paddingElement?: any;
  sideBarSection?: boolean;
  mainelement?: any;
}

export function Greeting(props: GreetingProps): JSX.Element {
  const {
    className = '',
    title = '',
    children,
    childrenWrapperProps = {},
    sx = {},
    paddingElement,
    mainelement,
    sideBarSection = true,
    ...rest
  } = props;

  const user = useUser((state) => state.user);
  
  return (
    <Box
      sx={[
        {
          ...greetingStyles.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={{ fontWeight: 600 }}>
        Welcome, <>{user?.firstName ?? 'User'}</>!
      </Typography>
      <Typography sx={{ fontStyle: 'italic' }}>Select any services from the sidebar to open</Typography>
    </Box>
  );
}
