import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Drawer as MuiDrawer } from '@mui/material';
import CloseIcon from '@assets/closeIcon';
import { forwardRef, useState, useEffect } from 'react';
import { drawerStyle } from './style';

export interface DrawerProps {
  header?: any;
  children?: any;
  height?: string;
  hideBackdrop?: boolean;
  show?: boolean;
  anchor?: any;
  footer?: any;
  isCloseIconRequired?: boolean;
  drawerRightClose?: boolean;
  rootStyle?: object;
  headerStyle?: object;
  footerStyle?: object;
  childrenStyle?: object;
  drawerStyleSX?: any;
  onCloseDrawer?: () => void;
  closeStyle?: object;
  className?: string;
  sx?: SxProps<Theme>;
}

export const Drawer = forwardRef((props: DrawerProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    header,
    children,
    height = 'auto',
    hideBackdrop = false,
    show = false,
    anchor = 'left',
    footer,
    isCloseIconRequired = false,
    drawerRightClose = false,
    rootStyle = {},
    headerStyle = {},
    footerStyle = {},
    drawerStyleSX = {},
    childrenStyle = {},
    onCloseDrawer = () => false,
    closeStyle = {},
    ...rest
  } = props;

  const [state, setState] = useState(show);

  useEffect(() => {
    if (show) {
      setState(true);
    } else {
      setState(false);
    }
  }, [show]);
  return (
    <MuiDrawer
      sx={{
        ...drawerStyle.rootSx,
        ...rootStyle,
      }}
      anchor={anchor}
      open={state}
      onClose={() => {
        setState(false);
        onCloseDrawer();
      }}
      hideBackdrop={hideBackdrop}
      {...rest}
    >
      <Box sx={drawerStyle.totalHeaderSx}>
        {header && (
          <Box
            sx={{
              ...drawerStyle.headerSx,
              ...headerStyle,
            }}
          >
            {header}
          </Box>
        )}
        <>
          {drawerRightClose && (
            <Box sx={{ cursor: 'pointer', padding: '0px 16px' }}>
              <CloseIcon
                onClick={() => {
                  setState(false);
                  onCloseDrawer();
                }}
              />
            </Box>
            // rootStyle={{ ...drawerStyle.closeSx, ...closeStyle }}
            // open={state}
            // onClick={() => {
            //   setState(false);
            //   onCloseDrawer();
            // }}
          )}
        </>
      </Box>

      <Box
        sx={{
          ...drawerStyle.childrenSx,
          ...drawerStyleSX,
          height,
        }}
      >
        {children}
      </Box>
      {footer && (
        <Box
          sx={{
            ...drawerStyle.footerSx,
            ...footerStyle,
          }}
        >
          {footer}
        </Box>
      )}
      {/* {isCloseIconRequired && (
          <Box>
            <CloseIcon
              open={state}
              onClick={() => {
                setState(false);
                onCloseDrawer();
              }}
            />
          </Box>
        )} */}
    </MuiDrawer>
  );
});

Drawer.displayName = 'Drawer';
