import type { SxProps } from '@mui/material';

interface InputStyleProps {
  [key: string]: SxProps;
}

export const inputStyle: InputStyleProps = {
  textFieldSx: {
    opacity: 1,
    '& .MuiOutlinedInput-root': { pl: '4px' },
    '& .MuiOutlinedInput-input': {
      width: '100%',
      fontWeight: 600,
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '8px',
      border: '1.5px solid',
      borderColor: '#EAEAEA',
      '& .Mui-focused': {
        border: '0px',
      },
    },

    '& .MuiFormHelperText-root': {
      mx: 0,
    },
  },
};
