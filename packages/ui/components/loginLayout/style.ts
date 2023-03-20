import type { SxProps } from '@mui/material';

interface LoginLayoutStyleProps {
  [key: string]: SxProps;
}

export const loginLayoutStyle: LoginLayoutStyleProps = {
  rootSx: {
    height: '100vh',
    display: 'grid',
    px: 5,
    py: 4.5,
    backgroundColor: '#F8F8F8',
  },
  imgSecSx: {
    // py: 8,
    alignItems: 'center',
    display: {
      xs: 'none',
      sm: 'flex',
      md: 'flex',
      lg: 'flex',
      xl: 'flex',
    },
    justifyContent: 'center',
  },
  formSx: {
    py: {
      xs: 3,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
    },
    display: 'grid',
    alignItems: 'center',
  },
  bottomImgSx: {
    bottom: 24,
    left: 20,
  },
  childrenSx: {
    // minHeight: '100vh',
    // backgroundColor: 'grey.100',
    // overflow: 'auto',
  },
};
