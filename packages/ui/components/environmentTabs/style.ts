import type { SxProps } from '@mui/material';

interface EnvironmentTabsStyleProps {
  [key: string]: SxProps;
}

export const EnvironmentTabsStyle: EnvironmentTabsStyleProps = {
  rootSx: {},
  selectedSx: {
    borderBottom: '2px solid #357968 ',
    color: '#357968',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '0 !important',
    textTransform: 'capitalize',
    // fontFamily: 'Inter',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '110px',
  },
  unSelectedSx: {
    borderBottom: 'none',
    color: '#5A5A5A',
    textTransform: 'capitalize',
    '& button': {
      padding: '0 !important',
    },
    fontSize: '14px',
    fontWeight: 'bold',
    // fontFamily: 'Inter',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '110px',
  },
};
