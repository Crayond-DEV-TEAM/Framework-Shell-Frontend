import type { SxProps } from '@mui/material';

interface PlanEffectiveStyleProps {
  [key: string]: SxProps;
}

export const planEffectiveStyle: PlanEffectiveStyleProps = {
  rootSx: {
    display: 'flex',
    alignItems: 'center',
  },
  plnText: {
    fontSize: '12px',
    mr: '16px',
    ml: '16px',
  },
  now: {
    '& .MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      padding: '7px 16px',
    },
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    padding: '7px 16px',
  },
  nextBilling: {
    backgroundColor: '#EAEAEA',
    padding: '7px 16px',
  },
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
      padding: '7px 16px',
      height: '30px',
      borderRadius: '4px !important',
      backgroundColor: '#EFEFEF',
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
