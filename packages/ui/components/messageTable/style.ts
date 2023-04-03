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
    padding: '0px 10px',
    borderRadius: '8px',
    height: '70vh',
  },
  totalTableSx: {
    padding: '26px 12px',
  },
  // addSx: { width: '100%', maxWidth: '230px', margin: '0px 21px' },
};
