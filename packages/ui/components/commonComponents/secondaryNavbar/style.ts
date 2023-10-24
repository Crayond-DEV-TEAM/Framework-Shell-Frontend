import type { SxProps } from '@mui/material';

interface SecondaryNavbarStyleProps {
  [key: string]: SxProps;
}

export const secondaryNavbarStyle: SecondaryNavbarStyleProps = {
  rootSx: {
    // height: '52px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #EAEAEA',
    opacity: 1,
    display: 'flex',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px',
  },
  reportTabs: {
    borderRadius: '6px',
    boxShadow: '0px 4px 10px #0000000A',
    ml: '24px',
  },
};
