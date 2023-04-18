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
    paddingLeft: '0',
    textTransform: 'capitalize',
    // fontFamily: 'Inter',
  },
  unSelectedSx: {
    borderBottom: 'none',
    color: '#5A5A5A',
    textTransform: 'capitalize',
    paddingLeft: '0',
    fontSize: '14px',
    fontWeight: 'bold',
    // fontFamily: 'Inter',
  },
};
