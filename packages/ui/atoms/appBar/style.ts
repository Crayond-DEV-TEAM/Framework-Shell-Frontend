import type { SxProps } from '@mui/material';

interface AppBarStyleProps {
  [key: string]: SxProps;
}

export const appBarStyle: AppBarStyleProps = {
  rootSx: {
    flexGrow: 1,
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'primary.contrastText',
  },
  appBar: {
    px: 2,
    py: 0.5,
    width: '100%',
  },
  mainSx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'primary.contrastText',
  },
  email: {
    fontSize: '12px',
    fontWeight: 400,
    color: 'primary.contrastText',
  },
  profileSec: {
    display: 'flex',
    alignItems: 'center',
  },
};
