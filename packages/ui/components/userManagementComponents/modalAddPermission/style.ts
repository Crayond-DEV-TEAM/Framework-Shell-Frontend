import type { SxProps } from '@mui/material';

interface ModalAddPermissionStyleProps {
  [key: string]: SxProps;
}

export const modalAddPermissionStyle: ModalAddPermissionStyleProps = {
  rootSx: { paddding: '12px' },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    pb: 1,
    fontWeight: '500',
  },
  labelRootRole: {
    fontSize: '12px',
    color: '#262C33',
    pb: 1,
    fontWeight: '500',
    marginRight: 2
  },

  inputGroupSx: {
    display: 'grid',
    pb: 2,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
};
