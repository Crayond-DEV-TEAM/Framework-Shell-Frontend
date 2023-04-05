import type { SxProps } from '@mui/material';

interface MessageTableStyleProps {
  [key: string]: SxProps;
}

export const messageTableStyle: MessageTableStyleProps = {
  rootSx: {},
  commonTable: {
    bgcolor: '#fff',
    margin: {
      lg: '0px 12px',
      md: '0px 12px',
      sm: '10px 20px',
      xs: '10px 0px',
    },
    padding: '20px 26px',
    // margin: '24px 31px',
    borderRadius: '8px',
    height: 'calc(100vh - 100px)',
    border: '1px solid #EAEAEA',
    '& .css-x5ymgk': {
      gap: '0px',
      marginBottom: '14px',
      padding: 0,
    },
  },
  totalTableSx: {
    padding: '0px 12px',
  },
  tableHeaderSx: {
    // paddding: '40px',
  },
  // addSx: { width: '100%', maxWidth: '230px', margin: '0px 21px' },
};
