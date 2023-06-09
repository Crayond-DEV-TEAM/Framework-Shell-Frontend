import { ApiProfile, ChatNav, KeyBoardDown, Logout, ManIcon } from '@atoms/icons';
import React, { useState } from 'react';
import { Avatar, SxProps, Typography, Menu, MenuItem, Theme } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { appBarStyle } from './style';
import { useAuth } from '@core/store';
import { UserDataInterface } from '@core/store/interface';
import { localStorageKeys } from '@core/utils';
import { parseJwt } from '@core/utils';
export interface AppBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  user?: null | UserDataInterface;
  title?: string;
  open?: boolean;
}

export function AppBar(props: AppBarProps): JSX.Element {
  const { className = '', sx = {}, title = 'Message Catlogue', ...rest } = props;
  const [open, setOpen] = useState<boolean>(false);
  const token = localStorage.getItem(localStorageKeys.authToken);
  const user = parseJwt(token);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { logOut } = useAuth();
  console.log(user, 'user');

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
                <Typography sx={appBarStyle.profileName}>{user?.username}</Typography>
                <Typography sx={appBarStyle.email}>{user?.email_id}</Typography>
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
        sx={{
          top: '18px',
          right: '28px',
          '& .MuiPaper-root': { width: '162px', height: '109px' },
          '& .MuiList-root': { paddingTop: '0px', paddingBottom: '0px' },
        }}
      >
        <MenuItem>
          <Box sx={appBarStyle.profileSec}>
            <ManIcon />
            <Typography sx={appBarStyle.menutext}>My Profile</Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={appBarStyle.profileSec}>
            <ApiProfile />
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
