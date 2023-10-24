import type { SxProps } from '@mui/material';

interface SideBarIdmLayoutStyleProps {
  [key: string]: SxProps;
}

export const sideBarIdmLayoutStyle: SideBarIdmLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    backgroundColor: '#F6F6F6',
    overflow: 'auto',
    padding: '76px 20px 0px 320px',
    height: '100vh',
  },
};
