import type { SxProps } from '@mui/material';

interface SideBarStyleProps {
  [key: string]: SxProps;
}

export const sideBarStyle: SideBarStyleProps = {
  mainSx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  menutext: {
    pl: 0.5,
    fontSize: '12px',
    color: 'typography.transparent',
  },
  listheading: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 600,
    },
  },
  listSubheading: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      color: 'typography.transparent',
    },
  },
};
