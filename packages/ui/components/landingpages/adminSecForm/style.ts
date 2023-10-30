import type { SxProps } from '@mui/material';

interface AdminSecFormStyleProps {
  [key: string]: SxProps;
}

export const adminSecFormStyle: AdminSecFormStyleProps = {
  rootSx: {},
  padd: {
    // p: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
  },

  inputGroupSx: {
    display: 'grid',
    // pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
};
