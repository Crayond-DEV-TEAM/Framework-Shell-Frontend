import { ApiProfile, ChatNav, KeyBoardDown, Logout, ManIcon } from '@atoms/icons';
import { useAuth } from '@core/store';
import { UserDataInterface } from '@core/store/interface';
import { localStorageKeys, parseJwt } from '@core/utils';
import { Avatar, Divider, AppBar as MUIAppBar, Menu, MenuItem, Stack, SxProps, Theme, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { appBarStyle } from './style';
import { useNavigate } from "react-router-dom";
// import { ThemeContext } from '@emotion/react';
export interface AppBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  user?: null | UserDataInterface;
  title?: string;
  open?: boolean;
}

export function AppBar(props: AppBarProps): JSX.Element {
  const { className = '', sx = {}, title = 'Message Catlogue', ...rest } = props;
  const [open, setOpen] = useState({
    setting: false,
    theme: false
  });
  const token = localStorage.getItem(localStorageKeys.authToken);
  const user = parseJwt(token);
  const history = useNavigate();

  // const themeContext = React.useContext(ThemeContext);

  const handleOpen = (key: string) => {
    setOpen({
      ...open, [key]: true
    });
  };
  const handleClose = (key: string) => {
    setOpen({
      ...open, [key]: false
    });
  };
  const { logOut } = useAuth();
  console.log(open, 'user');

  const myProfile = () => {
    history("/profile");
  };

  const handleTheme = (theme: string) => {
    if(theme === '')
    // themeContext
  }

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
            <Box onClick={() => handleOpen('theme')} sx={{ background: '#fff', width: '30px', height: '30px', borderRadius: '6px' }}></Box>
            <Box sx={appBarStyle.profileSec}>
              <Box sx={{ pl: 3, pr: 1 }}>
                <Typography sx={appBarStyle.profileName}>{user?.username}</Typography>
                <Typography sx={appBarStyle.email}>{user?.email_id}</Typography>
              </Box>
              <Avatar
                // src={'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'}
                variant="rounded"
                sx={{ borderRadius: '8px' }}
              />
              <Box sx={{ pl: 1 }} onClick={() => handleOpen('setting')}>
                <KeyBoardDown />
              </Box>
            </Box>
          </Box>
        </Box>
      </MUIAppBar>



      <Menu
        open={open?.theme}
        onClose={() => handleClose('theme')}

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
          padding: '16px',
          right: '28px',
          '& .MuiPaper-root': { width: '162px', height: 'auto' },
          // '& .MuiList-root': { paddingTop: '0px', paddingBottom: '0px' },
        }}
      >
        <Stack>
          <Typography sx={{ fontSize: '15px', color: '#2A3C50', fontWeight: '500' }}>Theme Settings</Typography>
        </Stack>
        <Divider mt={1} sx={{ background: '#ccc', color: '#ccc' }} />
        <Typography my={1} sx={{ fontSize: '12px', color: '#6A7888', fontWeight: '500' }}>Choose Theme</Typography>
        <Stack direction='row' spacing={1}>
          <Box onClick={() => handleTheme('default')} sx={{ background: 'green', width: '30px', height: '30px', borderRadius: '6px' }}>
          </Box>
          <Box onClick={() => handleTheme('dark')} sx={{ background: 'red', width: '30px', height: '30px', borderRadius: '6px' }}>
          </Box>
          {/* <Box sx={{ background: 'blue', width: '30px', height: '30px', borderRadius: '6px' }}>
          </Box> */}
        </Stack>
      </Menu>


      <Menu
        open={open?.setting}
        onClose={() => handleClose('setting')}
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
          '& .MuiPaper-root': { width: '162px', height: 'auto' },
          '& .MuiList-root': { paddingTop: '0px', paddingBottom: '0px' },
        }}
      >
        <MenuItem onClick={myProfile}>
          <Box sx={appBarStyle.profileSec}>
            <ManIcon />
            <Typography sx={appBarStyle.menutext} >
              My Profile
            </Typography>
          </Box>
        </MenuItem>
        {/* Commented As per requirment */}
        {/* <MenuItem>
          <Box sx={appBarStyle.profileSec}>
            <ApiProfile />
            <Typography sx={appBarStyle.menutext}>API Key</Typography>
          </Box>
        </MenuItem> */}
        <MenuItem onClick={logOut}>
          <Box sx={appBarStyle.profileSec}>
            <Logout />
            <Typography sx={appBarStyle.menutext}>Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
