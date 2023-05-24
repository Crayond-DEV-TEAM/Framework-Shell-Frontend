import type { SxProps } from '@mui/material';

interface AddressFormStyleProps {
  [key: string]: SxProps;
}

export const addressFormStyle: AddressFormStyleProps = {
  rootSx: {},
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
};
