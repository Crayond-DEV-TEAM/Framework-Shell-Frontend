import type { SxProps } from '@mui/material';

interface EnvironmentTabsStyleProps {
  [key: string]: SxProps;
}

export const EnvironmentTabsStyle: EnvironmentTabsStyleProps = {
  rootSx: {},
  selectedSx: {
    '& p': {
      color: '#357968',
      fontSize: '14px',
      fontWeight: 'bold',
      borderBottom: '2px solid #357968 ',
      textTransform: 'capitalize',
      padding: '12px 0px !important',
    },
    '& div': {
      marginLeft: '8px',
    },
    // fontFamily: 'Inter',
    padding: '0 10px !important',
    cursor: 'pointer',
    justifyContent: 'space-between',
    maxWidth: '110px',
  },
  unSelectedSx: {
    textTransform: 'capitalize',
    padding: '0 10px !important',
    cursor: 'pointer',
    '& p': {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#5A5A5A',
      borderBottom: 'none',
      padding: '12px 0px !important',
    },
    '& div': {
      marginLeft: '8px',
    },
    // fontFamily: 'Inter',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '110px',
  },
  contentSx: {
    '&.MuiDialogContent-root': {
      paddingBottom: '0px',
    },
  },
};
