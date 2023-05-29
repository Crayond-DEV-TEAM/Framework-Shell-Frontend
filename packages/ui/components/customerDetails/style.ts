import type { SxProps } from '@mui/material';

interface CustomerDetailsStyleProps {
  [key: string]: SxProps;
}

export const customerDetailsStyle: CustomerDetailsStyleProps = {
  rootSx: {},
  content: {
    padding: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    pb: 1,
    fontWeight: '500',
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
  inputText: {
    fontSize: '16px',
    fontWeight: 500,
  },
  align: {
    display: 'flex',
    alignItems: 'center',
  },
  dialogSx: {
    width: '823px',
    height: '551px',
  },
  admindialogSx: {
    width: '400px',
    height: '390px',
  },
  subscription: {
    display: 'flex',
    justifyContent: 'center',
    color: 'primary.main',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
