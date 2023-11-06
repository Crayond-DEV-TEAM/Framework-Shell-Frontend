import { useMenu } from '@core/store';
import { Menu } from '@core/store/interface';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  CSSObject,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Skeleton,
  SxProps,
  Theme,
  Typography,
  styled,
} from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { sideBarStyle } from './style';
import { localStorageKeys } from '@core/utils';
import { Alert, AlertRuleIcon } from '@atoms/icons';
import { webRoutes } from '@core/routes';

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
  const { sideMenus, loading, error, getSideMenusFromProject } = useMenu();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState<boolean>(false);
  const [openCollapse, setopenCollapse] = useState<any>(false);

  const handleDrawerOpen = () => {
    setopenCollapse(!openCollapse);
    setDrawer(true);
  };
  const onLinkClick = (data: Menu) => {
    navigate(data.link);
    // debugger;
    // if (
    //   data.baseUrl === window.location.protocol + '//' + window.location.host ||
    //   window.location.hostname === 'localhost'
    // ) {
    //   navigate(data.link);
    // } else {
    //   // window.location.replace(data.baseUrl + data.link);
    // }
    return false;
  };

  const handleDrawerClose = () => setDrawer(false);

  const handleClickCollapse = (index: number) => {
    setopenCollapse(index === openCollapse ? -1 : index);
  };

  const fetchMenu = (projectId: any) => {
    if (projectId) {
      getSideMenusFromProject(projectId);
    }
  };

  const projectRouterfunc = () => {
    navigate(webRoutes.admin);
    localStorage.removeItem(localStorageKeys.projectId);
  };

  React.useEffect(() => {
    const projectId = localStorage.getItem(localStorageKeys?.projectId);
    // fetchMenu(projectId);
    if (!projectId) {
      const projectIdCheck = setTimeout(() => {
        navigate(webRoutes.admin);
      }, 750);
      return () => clearTimeout(projectIdCheck);
    }
  }, []);
  // console.log(sideMenus, 'sidem======');

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
          {/* <Collapse timeout="auto" unmountOnExit> */}
          <List
            component="div"
            disablePadding
            sx={{ display: drawer ? 'block' : 'none', bottom: 0, position: 'fixed', width: '28%' }}
          >
            <ListItemButton onClick={projectRouterfunc}>
              <AlertRuleIcon />
              <Typography sx={{ ml: 2, fontSize: '12px', fontWeight: 600 }}>Back to projects</Typography>
            </ListItemButton>
          </List>
          {/* </Collapse> */}
        </List>
        {/* <Typography >{'<-Back'}</Typography> */}
      </Drawer>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
