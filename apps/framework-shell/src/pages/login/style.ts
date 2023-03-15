import type { SxProps } from '@mui/material';

interface LoginStyleProps {
  [key: string]: SxProps;
}

export const loginStyle: LoginStyleProps = {
  rootSx: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
};
