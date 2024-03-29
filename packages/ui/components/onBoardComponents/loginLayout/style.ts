import type { SxProps } from '@mui/material';

interface LoginLayoutStyleProps {
  [key: string]: SxProps;
}

export const loginLayoutStyle: LoginLayoutStyleProps = {
  rootSx: {
    minHeight: '100vh',
    display: 'grid',
    backgroundColor: '#F8F8F8',
    // px: {
    //   xs: 2,
    //   sm: 5,
    //   md: 5,
    //   lg: 5,
    //   xl: 5,
    // },
    p: 3.75,
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
      xs: 2,
      sm: 2,
      md: 0,
      lg: 0,
      xl: 0,
    },
    display: 'grid',
    alignItems: 'center',
  },
  bottomImgSx: {
    // bottom: 24,
    // left: 20,
  },
  toolkit: {
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'start',
      md: 'start',
      lg: 'start',
      xl: 'start',
    },
    alignItems: {
      xs: 'flex-end',
      sm: 'start',
      md: 'start',
      lg: 'start',
      xl: 'start',
    },
  },
  toolkitBottom: {
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'start',
      md: 'start',
      lg: 'start',
      xl: 'start',
    },
    alignItems: {
      xs: 'flex-end',
      sm: 'end',
      md: 'end',
      lg: 'end',
      xl: 'end',
    },
  },
  toolkitText: {
    pl: 1.5,
    fontWeight: 600,
    color: 'primary.main',
    fontSize: '26px',
  },
  version:{
    p: 1,
    fontWeight: 500,
    color: 'primary.main',
    fontSize: '16px',
  },
  power: {
    pl: 1.5,
    fontSize: '14px',
    color: 'typography.label',
  },
  onboardButton:{
    color:'primary.main',
    fontWeight:600,
    fontSize:'14px',
    cursor:'pointer'
  }
};
