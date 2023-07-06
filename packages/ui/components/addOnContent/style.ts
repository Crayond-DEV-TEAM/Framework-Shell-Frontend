import type { SxProps } from '@mui/material';

interface AddOnContentStyleProps {
  [key: string]: SxProps;
}

export const addOnContentStyle: AddOnContentStyleProps = {
  rootSx: {
    p: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
  },
  labelTwoSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
    pt: 2,
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
  inputBigSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      height: '80px',
    },
  },
};
