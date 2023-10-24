import type { SxProps } from '@mui/material';

interface SideBarIdmStyleProps {
  [key: string]: SxProps;
}

export const sideBarIdmStyle: SideBarIdmStyleProps = {
  rootSx: {},
  drawerStyle: {
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: '300px',
      marginTop: '56px',
      boxSizing: 'border-box',
      // borderRadius: '0px 15px 15px 0px',
      backgroundColor: '#357968',
      padding: '16px',
      // color: 'black',
    },
  },
  listItem: {
    '&.MuiListItemIcon-root': {
      minWidth: '33px',
    },
  },
  listtext: {
    color: '#fff',
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 600,
    },
  },
  name: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 600,
  },
};
