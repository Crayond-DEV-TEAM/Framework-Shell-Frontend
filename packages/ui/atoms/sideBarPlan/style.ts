import type { SxProps } from '@mui/material';

interface SideBarPlanStyleProps {
  [key: string]: SxProps;
}

export const sideBarPlanStyle: SideBarPlanStyleProps = {
  rootSx: {},
  drawerStyle: {
    width: '338px',
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: '338px',
      boxSizing: 'border-box',
      borderRadius: '0px 15px 15px 0px',
      backgroundColor: '#06100E',
      padding: '16px',
    },
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'primary.contrastText',
    marginBottom: '16px',
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
    },
  },
  profileName: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'primary.contrastText',
  },
  email: {
    fontSize: '10px',
    fontWeight: 300,
    color: 'primary.contrastText',
  },
  profileSec: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    // left: '-8px',
    // top: '8px',
    bottom: '10px',
    width: '92%',
    // right: '28px',
    backgroundColor: '#06100E',
    padding: '12px',
  },
  topCard: {
    padding: '16px',
    backgroundColor: '#2C3432',
    borderRadius: '8px',
    // display: 'flex',
  },
  alignment: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnAlignment: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
    backgroundColor: '#357968',
    color: 'primary.contrastText',
    borderRadius: '4px',
    mt: 1.5,
    textTransform: 'capitalize',
    fontSize: '14px',
    width: 'auto',
  },
  devBtn: {
    padding: '4px 8px',
    fontSize: '10px',
    backgroundColor: '#E2FAF3',
    color: '#14372E',
    borderRadius: '8px',
    fontWeight: 600,
  },
  linkBtn: {
    fontSize: '12px',
    color: 'primary.contrastText',
  },
  ColobBtn: {
    fontSize: '14px',
    color: 'primary.contrastText',
    fontWeight: 600,
  },
};
