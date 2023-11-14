import type { BoxProps, SxProps, Theme } from '@mui/material';
import { useUser } from '@core/store/framework-shell/user';
import { Box, Typography } from '@mui/material';

import { greetingStyles } from './style';
import { BannerSvg } from '@atoms/icons';

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
      <Box sx={greetingStyles?.subRootSx}>
        <Box sx={greetingStyles?.bannerbox}>
          <BannerSvg />
          <Typography my={1} sx={{ fontWeight: 600, fontSize: '22px', textAlign: 'center' }}>
            Welcome to Crayond's Framework Shell
          </Typography>
          <Typography mb={1} sx={{ fontStyle: 'italic', fontSize: '18px', textAlign: 'center' }}>
            Select any services from the sidebar to open
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
