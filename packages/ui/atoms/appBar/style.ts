import type { SxProps } from '@mui/material';

interface AppBarStyleProps {
  [key: string]: SxProps;
}

export const appBarStyle: AppBarStyleProps = {
  rootSx: {
    // flexGrow: 1,
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'primary.contrastText',
  },
  appBar: {
    px: 2,
    py: 1,
    width: '100%',
  },
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
