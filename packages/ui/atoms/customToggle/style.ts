import type { SxProps } from '@mui/material';

interface CustomToggleStyleProps {
  [key: string]: SxProps;
}

export const customToggleStyle: CustomToggleStyleProps = {
  rootSx: {},
  buttonGrp: {
    '&.MuiToggleButtonGroup-root': {
      gap: '8px',
      // backgroundColor: 'primary.contrastText',
    },
  },
  btnEft: {
    '&.MuiToggleButtonGroup-grouped': {
      color: '#000000',
      // width: '51px',
      padding: '8px',
      height: '30px',
      borderRadius: '6px !important',
      backgroundColor: '#e0e0e0',
      fontSize: '12px',
      border: '0px solid',
      textTransform: 'capitalize',
    },
    '&.MuiButtonBase-root.MuiToggleButton-root.Mui-selected:hover': {
      backgroundColor: 'primary.main',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
    '&.MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
  },
};
