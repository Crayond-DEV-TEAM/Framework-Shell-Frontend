import type { SxProps } from '@mui/material';

interface LoginLayoutStyleProps {
  [key: string]: SxProps;
}

export const loginLayoutStyle: LoginLayoutStyleProps = {
  rootSx: {
    minHeight: '100vh',
    display: 'grid',
    backgroundColor: 'background.page',
    px: {
      xs: 2,
      sm: 5,
      md: 5,
      lg: 5,
      xl: 5,
    },
    py: 4.5,
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
      xs: 1,
      sm: 1,
      md: 4,
      lg: 4,
      xl: 4,
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
      sm: 'center',
      md: 'center',
      lg: 'center',
      xl: 'center',
    },
  },
  toolkitText: {
    pl: 1.5,
    fontWeight: 600,
    color: 'primary.main',
    fontSize: '26px',
  },
  power: {
    pl: 1.5,
    fontSize: '14px',
    color: 'typography.label',
  },
};
