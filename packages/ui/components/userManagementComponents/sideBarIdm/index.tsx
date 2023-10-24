import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { sideBarIdmStyle } from './style';
// import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link if you're using React Router
import { localStorageKeys, parseJwt } from '@core/utils';
import { sideBarData } from './utills';

export interface SideBarIdmProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SideBarIdm = (props: SideBarIdmProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const navigate = useNavigate();
  const route = useLocation();
  const routeNAme = route.pathname;
  const token = localStorage.getItem(localStorageKeys.authToken);
  const user = parseJwt(token);

  return (
    <Box
      sx={[
        {
          ...sideBarIdmStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Drawer variant="permanent" anchor="left" sx={sideBarIdmStyle.drawerStyle}>
        <Box sx={{ mb: 2, mt: '-10px', border: '2px solid #fff', width: '30%' }} />
        <Typography sx={sideBarIdmStyle.name}>Welcome Back {user?.username}..!</Typography>
        <Typography sx={{ color: '#fff', fontSize: '14px' }}>Super Admin</Typography>
        <Box sx={{ m: '16px 0px', border: '2px solid #fff' }} />
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
                    backgroundColor: '#cecaca',
                    borderRadius: '8px',
                    color: 'primary.main',
                    '& .MuiListItemText-root': {
                      color: 'primary.main',
                    },
                    // m: '5px 0px',
                  },
                  '& .MuiListItemButton-root':
                    routeNAme === text.route
                      ? {
                          backgroundColor: '#cecaca',
                          borderRadius: '8px',
                          m: '5px 0px',
                          '& .MuiListItemText-root': {
                            color: 'primary.main',
                          },
                        }
                      : '',
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={sideBarIdmStyle.listItem}>{text.icon}</ListItemIcon>
                  <ListItemText sx={sideBarIdmStyle.listtext}>{text.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        ;
      </Drawer>
    </Box>
  );
};
