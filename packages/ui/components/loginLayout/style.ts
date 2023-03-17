import type { SxProps } from '@mui/material';

interface LoginLayoutStyleProps {
  [key: string]: SxProps;
}

export const loginLayoutStyle: LoginLayoutStyleProps = {
  rootSx: {
    //height: '100vh',
    display: 'grid',
    mx: 5,
    my: 4.5,
  },
  imgSecSx: {
    py: 8,
    display: {
      xs: 'none',
      sm: 'flex',
      md: 'flex',
      lg: 'flex',
      xl: 'flex',
    },
  },
  formSx: {
    py: {
      xs: 3,
      sm: 5,
      md: 5,
      lg: 5,
      xl: 5,
    },
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
