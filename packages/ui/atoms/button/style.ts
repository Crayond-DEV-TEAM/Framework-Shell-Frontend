import type { SxProps } from '@mui/material';

interface ButtonStyleProps {
  [key: string]: SxProps;
}

export const atomButton_style: ButtonStyleProps = {
  buttonSx: {
    borderRadius: '8px',
    '& .MuiLoadingButton-loadingIndicator': {
      color: '#357968',
    },
    '&.MuiLoadingButton-loading': {
      backgroundColor: '#EAF1EF',
    },
  },
};
