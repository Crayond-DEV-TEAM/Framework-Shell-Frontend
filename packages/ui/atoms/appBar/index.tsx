import CrayondLogo from '@assets/crayondLogo.png';
import { Button } from '@atoms/button';
import { useOnboarding } from '@core/store/framework-shell/onboarding';
import { UserDataProps } from '@core/store/framework-shell/user';
import { Avatar, SxProps, Theme, Typography } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CgProfile } from 'react-icons/cg';

import { appBarStyle } from './style';

export interface AppBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  user?: null | UserDataProps;
}

export function AppBar(props: AppBarProps): JSX.Element {
  const { className = '', user, sx = {}, ...rest } = props;

  const logOut = useOnboarding((state) => state.logOut);

  return (
    <Box
      sx={[
        {
          ...appBarStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <MUIAppBar position="static">
        <Toolbar>
          <Avatar src={CrayondLogo} sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crayon&apos;d
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', gap: 3, placeItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1, placeItems: 'center' }}>
                <CgProfile size={24} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Hi {user?.firstName}
                </Typography>
              </Box>
              <Button variant="text" sx={{ color: 'white' }} size="small" onClick={logOut}>
                Log Out
              </Button>
            </Box>
          )}
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}
