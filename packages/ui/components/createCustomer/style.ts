import type { SxProps } from '@mui/material';

interface CreateCustomerStyleProps {
  [key: string]: SxProps;
}

export const createCustomerStyle: CreateCustomerStyleProps = {
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
    // pb: 2,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  dialogSx: {
    width: '500px',
    height: '450px',
  },
};
