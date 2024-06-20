import type { SxProps } from '@mui/material';

interface AdminSecFormStyleProps {
  [key: string]: SxProps;
}

export const adminSecFormStyle: AdminSecFormStyleProps = {
  rootSx: {},
  padd: {},
  labelSx: {
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
    fontSize: '14px',
  },

  inputGroupSx: {
    display: 'grid',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
};
