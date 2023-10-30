import type { SxProps } from '@mui/material';

interface AppLayoutStyleProps {
  [key: string]: SxProps;
}

export const appLayoutStyle: AppLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    backgroundColor: 'grey.100',
    overflow: 'auto',
    padding: '30px 0px 0px 60px',
    height: 'calc(100vh - 50px)',
  },
};
