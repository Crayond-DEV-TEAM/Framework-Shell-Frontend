import type { SxProps } from '@mui/material';
import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
import { forwardRef } from 'react';
import React, { useState } from 'react';
import { sideBarStyle } from './style';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import {
  Alert,
  AlertConfigIcon,
  AlertRuleIcon,
  ApiIcon,
  ArrowDown,
  ArrowRight,
  MessageHub,
  ReportIcon,
  SubMessageGroup,
  SubMessageLanguage,
} from '@atoms/icons';
import { useNavigate } from 'react-router-dom';
import { messageRoutes } from '@core/routes';

export interface SideBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  open?: boolean;
  onClick?: () => void;
}
const drawerWidth = 208;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  marginTop: '48px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: '48px',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const SideBar = forwardRef((props: SideBarProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [drawer, setDrawer] = useState<boolean>(false);
  const [openSubCollapse, setopenSubCollapse] = useState<boolean>(false);
  const [openCollapse, setopenCollapse] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
  };
  const handleClickSubCollapse = () => {
    setopenSubCollapse(!openSubCollapse);
  };
  const handleClickCollapse = () => {
    setopenCollapse(!openCollapse);
  };
  const handleroute = () => {
    navigate(messageRoutes.languageConfig);
  };
  const handleroutelang = () => {
    navigate(messageRoutes.messagegroup);
  };

  return (
    <Box
      sx={[
        {
          ...sideBarStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Drawer
        variant="permanent"
        open={drawer}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        sx={sideBarStyle.drawerSx}
      >
        <List>
          <Box>
            <ListItem
              // onClick={() => {
              //   navigate('/user/dashboard');
              // }}
              key={'Inbox'}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 56,
                  justifyContent: drawer ? 'initial' : 'center',
                  px: 2.0,
                }}
                onClick={handleClickCollapse}
              >
                <ListItemIcon
                  sx={{
                    padding: '4px',
                    borderRadius: '8px',
                    backgroundColor: 'background.primaryBg',
                    minWidth: 0,
                    mr: drawer ? 1 : 'auto',
                  }}
                >
                  <Alert />
                </ListItemIcon>
                <ListItemText primary={'Alerts Hub'} sx={{ ...sideBarStyle.listheading, opacity: drawer ? 1 : 0 }} />
                {drawer ? openCollapse ? <ArrowDown /> : <ArrowRight /> : ''}
              </ListItemButton>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ display: drawer ? 'block' : 'none' }}>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <AlertRuleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alert Rule" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <ApiIcon />
                    </ListItemIcon>
                    <ListItemText primary="API Documentation" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <AlertConfigIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alert Configuration" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>
                </List>
              </Collapse>
            </ListItem>
            <ListItem
              // onClick={() => {
              //   navigate('/user/dashboard');
              // }}
              key={'Inbox'}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawer ? 'initial' : 'center',
                  px: 2.0,
                  alignItems: 'center',
                }}
                onClick={handleClickSubCollapse}
              >
                <ListItemIcon
                  sx={{
                    padding: '4px',
                    minWidth: 0,
                    mr: drawer ? 1 : 'auto',
                  }}
                >
                  <MessageHub />
                </ListItemIcon>
                <ListItemText
                  primary={'Message Catlogue'}
                  sx={{ ...sideBarStyle.listheading, opacity: drawer ? 1 : 0 }}
                />
                {drawer ? openSubCollapse ? <ArrowDown /> : <ArrowRight /> : ''}
              </ListItemButton>
              <Collapse in={openSubCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ display: drawer ? 'block' : 'none' }}>
                  <ListItemButton sx={{ pl: 3.5 }} onClick={handleroute}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <SubMessageLanguage />
                    </ListItemIcon>
                    <ListItemText primary="Language Config" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 3.5 }} onClick={handleroutelang}>
                    <ListItemIcon
                      sx={{
                        padding: '4px',
                        minWidth: 0,
                        mr: drawer ? 1 : 'auto',
                      }}
                    >
                      <SubMessageGroup />
                    </ListItemIcon>
                    <ListItemText primary="message Group" sx={{ ...sideBarStyle.listSubheading }} />
                  </ListItemButton>
                </List>
              </Collapse>
            </ListItem>
          </Box>
        </List>
      </Drawer>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
