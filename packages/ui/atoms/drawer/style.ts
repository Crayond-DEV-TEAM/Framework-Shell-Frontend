import type { SxProps } from '@mui/material';

interface DrawerStyleProps {
  [key: string]: SxProps;
}

export const drawerStyle: DrawerStyleProps = {
  rootSx: {
    '& .MuiDrawer-paperAnchorRight': {
      width: '338px',
    },
  },
  headerSx: { p: 2 },
  childrenSx: { p: 2, overflow: 'overlay' },
  footerSx: {
    p: 3,
    bgcolor: 'common.white',
    borderTop: '1.3px dashed',
    borderColor: 'border.main',
  },
  closeSx: {
    width: '15px',
    cursor: 'pointer',
    height: '14px',
  },
  rightClose: {
    padding: '12px',
    borderRadius: '50%',
    width: '40px',
    cursor: 'pointer',
    backgroundColor: '#ffe8e8',
    color: '#ff4b4b',
    height: '40px',
    margin: '10px 10px',
  },
  totalHeaderSx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'border.main',
  },
};
