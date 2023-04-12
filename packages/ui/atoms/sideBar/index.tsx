import { Divider, SxProps } from '@mui/material';
import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse, Skeleton } from '@mui/material';
import { forwardRef } from 'react';
import React, { useState } from 'react';
import { sideBarStyle } from './style';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { messageRoutes } from '@core/routes';
import { useMenu } from '@core/store';
import { localStorageKeys, parseJwt } from '@core/utils';
import { RiArrowDownLine, RiArrowRightDownLine } from 'react-icons/ri';
import { Menu } from '@core/store/interface';

export interface SideBarProps {
  className?: string;
  sx?: SxProps<Theme>;
  open?: boolean;
  onClick?: () => void;
  menuItems?: (item: any, index: any) => void;
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
  const { className = '', menuItems = () => false, sx = {}, ...rest } = props;

  //store data
  const { sideMenus, loading, error, getMenu, onLinkClick } = useMenu();
  const { pathname } = useLocation();

  const [drawer, setDrawer] = useState<boolean>(false);
  const [openCollapse, setopenCollapse] = useState<any>(false);

  const handleDrawerOpen = () => {
    setopenCollapse(!openCollapse);
    setDrawer(true);
  };

  const handleDrawerClose = () => setDrawer(false);

  const handleClickCollapse = (index: number) => {
    setopenCollapse(index === openCollapse ? -1 : index);
  };

  const fetchMenu = () => {
    getMenu();
  };

  React.useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Box
      sx={[{ ...sideBarStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
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
        <List sx={sideBarStyle?.listing}>
          {loading ? (
            <Box>
              <Skeleton variant="text" sx={sideBarStyle.skeletonSx} />
              <Skeleton variant="text" sx={sideBarStyle.skeletonSx} />
              <Skeleton variant="text" sx={sideBarStyle.skeletonSx} />
            </Box>
          ) : (
            <Box>
              {sideMenus?.map((item: Menu, index: number) => {
                let isSelected = matchPath(item.link, pathname) ? true : false;
                item.links?.every((link: string) => {
                  isSelected = matchPath(link, pathname) ? true : false;
                  if (isSelected) {
                    return false;
                  }
                  return true;
                });
                return (
                  <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        ...sideBarStyle.totalBtnSx,
                        justifyContent: drawer ? 'initial' : 'center',
                        py: 1,
                        my: '4px',
                        px: 1.25,
                      }}
                      disableRipple
                      onClick={() => handleClickCollapse(index)}
                    >
                      <ListItemIcon
                        sx={{
                          padding: '4px',
                          borderRadius: '8px',
                          backgroundColor: `${isSelected ? '#EAF1EF' : 'transperant'}`,
                          minWidth: 0,
                          mr: drawer ? 1 : 'auto',
                        }}
                      >
                        {item.icon(isSelected)}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{
                          ...sideBarStyle.listheading,
                          opacity: drawer ? 1 : 0,
                        }}
                      />
                      {drawer ? (
                        index === openCollapse ? (
                          <ExpandMoreIcon sx={{ fontSize: '18px', color: '#29302B' }} />
                        ) : (
                          <ChevronRightIcon sx={{ fontSize: '18px', color: '#29302B' }} />
                        )
                      ) : (
                        ''
                      )}
                    </ListItemButton>
                    {item?.childrens?.map((child: Menu, i: number) => {
                      const isChildSelected = matchPath(child.link, pathname) ? true : false;
                      return (
                        <Collapse key={i} in={index === openCollapse} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding sx={{ display: drawer ? 'block' : 'none' }}>
                            <ListItemButton
                              sx={{ ...sideBarStyle.menuSx, pl: 3.5 }}
                              disableRipple
                              selected={isChildSelected}
                              onClick={() => onLinkClick(child)}
                            >
                              <ListItemIcon
                                sx={{
                                  padding: '4px',
                                  minWidth: 0,
                                  mr: drawer ? 0.5 : 'auto',
                                }}
                              >
                                {child?.icon(isChildSelected)}
                              </ListItemIcon>
                              <ListItemText
                                primary={child?.name}
                                sx={{
                                  ...sideBarStyle.listSubheading,
                                  '& .MuiTypography-root': {
                                    fontSize: '12px',
                                    color: isChildSelected ? '#357968' : 'typography.transparent',
                                  },
                                }}
                              />
                            </ListItemButton>
                          </List>
                        </Collapse>
                      );
                    })}

                    {drawer ? <Divider orientation="horizontal" sx={{ ...sideBarStyle.dividerSx }} /> : ''}
                  </ListItem>
                );
              })}
            </Box>
          )}
        </List>
      </Drawer>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
