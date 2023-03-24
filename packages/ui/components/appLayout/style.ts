import type { SxProps } from '@mui/material';

interface AppLayoutStyleProps {
  [key: string]: SxProps;
}

export const appLayoutStyle: AppLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    minHeight: '100vh',
    backgroundColor: 'grey.100',
    overflow: 'auto',
    padding: '0px 0px 0px 55px',
  },
};
