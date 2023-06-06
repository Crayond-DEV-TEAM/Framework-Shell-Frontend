import type { SxProps, Theme } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { sideBarPlanStyle } from './style';
import { sideBarData } from './utils';
import { KeyBoardDown, RightArrowBtn, Test } from '@atoms/icons';
import Avatar from '@mui/material/Avatar';
import { localStorageKeys, parseJwt } from '@core/utils';
import { matchPath, useNavigate, useLocation, useNavigation } from 'react-router-dom';
import { Button } from '..';

export interface SideBarPlanProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SideBarPlan = (props: SideBarPlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const token = localStorage.getItem(localStorageKeys.authToken);
  const user = parseJwt(token);
  const navigate = useNavigate();
  const route = useLocation();
  const routeNAme = route.pathname;
  console.log('navigate', routeNAme);

  return (
    <Box
      sx={[
        {
          ...sideBarPlanStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Drawer variant="permanent" sx={sideBarPlanStyle.drawerStyle}>
        <Typography sx={sideBarPlanStyle.title}>Plan Manager</Typography>
        <Box sx={sideBarPlanStyle.topCard}>
          <Box sx={sideBarPlanStyle.alignment}>
            <Typography sx={sideBarPlanStyle.ColobBtn}>Colobo</Typography>
            <Typography sx={sideBarPlanStyle.devBtn}>Dev</Typography>
          </Box>
          <Typography sx={sideBarPlanStyle.linkBtn}>dev.colobo.gtm.com</Typography>
          <Button
            buttonStyle={sideBarPlanStyle.btnAlignment}
            endIcon={<RightArrowBtn rootStyle={{ mb: '-15px', ml: '2px' }} />}
          >
            Switch to Production
          </Button>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ mb: 6 }}>
            {sideBarData.map((text, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => {
                    navigate(text.route);
                  }}
                  sx={{
                    '& .MuiListItemButton-root:hover': {
                      backgroundColor: 'primary.main',
                      borderRadius: '8px',
                      // m: '5px 0px',
                    },
                    '& .MuiListItemButton-root':
                      routeNAme === text.route
                        ? { backgroundColor: 'primary.main', borderRadius: '8px', m: '5px 0px' }
                        : '',
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={sideBarPlanStyle.listItem}>{text.icon}</ListItemIcon>
                    <ListItemText sx={sideBarPlanStyle.listtext}>{text.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box sx={sideBarPlanStyle.profileSec}>
          <Box sx={{ pr: 1, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
              variant="rounded"
              sx={{ borderRadius: '8px' }}
            />
            <Box sx={{ pl: 1 }}>
              <Typography sx={sideBarPlanStyle.profileName}>{user?.username}</Typography>
              <Typography sx={sideBarPlanStyle.email}>{user?.email_id}</Typography>
            </Box>
          </Box>
          {/* onClick={handleOpen} */}
          <Box sx={{ pl: 1 }}>
            <KeyBoardDown rootStyle={{ height: '32px', width: '32px' }} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
