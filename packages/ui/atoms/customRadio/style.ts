import type { SxProps } from '@mui/material';

interface CustomRadioStyleProps {
  [key: string]: SxProps;
}

export const customRadioStyle: CustomRadioStyleProps = {
  rootSx: {},
  buttonGrp: {
    '&.MuiToggleButtonGroup-root': {
      gap: '8px',
      // backgroundColor: 'primary.contrastText',
    },
  },
  selected: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    fontSize: '12px',
    textTransform: 'capitalize',
    padding: '8px',
    height: '30px',
    borderRadius: '6px !important',
    border: '0px solid',
  },
  unselected: {
    color: '#000000',
    padding: '8px',
    height: '30px',
    borderRadius: '6px !important',
    backgroundColor: '#EFEFEF',
    fontSize: '12px',
    border: '0px solid',
    textTransform: 'capitalize',
  },
  noPadding: {
    // padding: '2px',
  },
};
