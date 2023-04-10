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
      fontWeight: 500,
      fontSize: '14px',
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

  Label: {
    color: "#262C33",
    fontSize: "12px",
    marginBottom: "6px",
  },

  required: {
    color: "red",
  },
};
