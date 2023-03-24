import { ChatNav, KeyBoardDown, Logout, ManIcon } from '@atoms/icons';
import React, { useState } from 'react';
import { useOnboarding } from '@core/store/framework-shell/onboarding';
import { UserDataProps } from '@core/store/framework-shell/user';
import { Avatar, SxProps, Typography, Menu, MenuItem, Theme } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { appBarStyle } from './style';
export interface AppBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  user?: null | UserDataProps;
  title?: string;
  open?: boolean;
}

export function AppBar(props: AppBarProps): JSX.Element {
  const { className = '', sx = {}, title = 'Message Catlogue', ...rest } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      <MUIAppBar sx={appBarStyle.appBar}>
        <Box sx={appBarStyle.mainSx}>
          <Typography sx={appBarStyle.title}>{title}</Typography>
          <Box sx={appBarStyle.profileSec}>
            <ChatNav />
            <Box sx={appBarStyle.profileSec}>
              <Box sx={{ pl: 3, pr: 1 }}>
                <Typography sx={appBarStyle.profileName}>Dhandapani</Typography>
                <Typography sx={appBarStyle.email}>dhandapani123@gmail.com</Typography>
              </Box>
              <Avatar
                src={'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'}
                variant="rounded"
                sx={{ borderRadius: '8px' }}
              />
              <Box sx={{ pl: 1 }} onClick={handleOpen}>
                <KeyBoardDown />
              </Box>
            </Box>
          </Box>
        </Box>
      </MUIAppBar>

      <Menu
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ top: '47px' }}
      >
        <MenuItem>
          <Box sx={appBarStyle.profileSec}>
            <ManIcon />
            <Typography sx={appBarStyle.menutext}>My Profile</Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={appBarStyle.profileSec}>
            <ManIcon />
            <Typography sx={appBarStyle.menutext}>API Key</Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={appBarStyle.profileSec} onClick={logOut}>
            <Logout />
            <Typography sx={appBarStyle.menutext}>Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
