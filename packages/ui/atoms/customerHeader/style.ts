import type { SxProps } from '@mui/material';

interface CustomerHeaderStyleProps {
  [key: string]: SxProps;
}

export const customerHeaderStyle: CustomerHeaderStyleProps = {
  rootSx: {
    padding: '4px 14px',
    width: 'calc( 100% - 327px)',
    position: 'fixed',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    zIndex: 999,
  },
  imageBorder: {
    border: '1px solid #3B3B3B',
    borderRadius: '20px',
    width: '32px',
    height: '32px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  btn: {
    padding: ' 6px 10px',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'end',
  },
};
