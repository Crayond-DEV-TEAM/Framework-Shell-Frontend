import type { SxProps } from '@mui/material';

interface AppLayoutStyleProps {
  [key: string]: SxProps;
}

export const appLayoutStyle: AppLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    backgroundColor: 'grey.100',
    overflow: 'auto',
    padding: '8px 0px 0px 57px',
    height: 'calc(100vh - 50px)',
  },
};
