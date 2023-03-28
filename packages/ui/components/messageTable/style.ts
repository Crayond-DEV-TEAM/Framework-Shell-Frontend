import type { SxProps } from '@mui/material';

interface MessageTableStyleProps {
  [key: string]: SxProps;
}

export const messageTableStyle: MessageTableStyleProps = {
  rootSx: {},
  commonTable: {
    bgcolor: '#fff',
    margin: '0px 20px',
    padding: '0px 10px',
    borderRadius: '8px',
  },
  totalTableSx: {
    margin: '31px 0px',
  },
  addSx: { width: '100%', maxWidth: '230px', margin: '0px 21px' },
};
