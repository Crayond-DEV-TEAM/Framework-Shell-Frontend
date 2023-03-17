import type { SxProps } from '@mui/material';

interface InputStyleProps {
  [key: string]: SxProps;
}

export const inputStyle: InputStyleProps = {
  textFieldSx: {
    opacity: 1,
    '& .MuiOutlinedInput-input': {
      width: '100%',
      fontWeight: 600,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '8px',
      border: '1.5px solid',
      borderColor: '#EAEAEA',
    },
    '& .MuiFormHelperText-root': {
      mx: 0,
    },
  },
};
