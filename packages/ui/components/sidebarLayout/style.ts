import type { SxProps } from '@mui/material';

interface SidebarLayoutStyleProps {
  [key: string]: SxProps;
}

export const sidebarLayoutStyle: SidebarLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    backgroundColor: '#F6F6F6',
    overflow: 'auto',
    padding: '2px 0px 0px 342px',
    height: '100vh',
  },
};
