import type { SxProps } from '@mui/material';

interface CustomerCardComponentStyleProps {
  [key: string]: SxProps;
}

export const customerCardComponentStyle: CustomerCardComponentStyleProps = {
  rootSx: {
    borderRadius: '8px',
    backgroundColor: 'primary.contrastText',
  },
  header: {
    padding: '11px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #EAEAEA',
  },
  title: {
    fontSize: '14px',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  addAdmin: {
    color: 'primary.main',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  body: {
    padding: '20px 16px',
    height: 'auto',
  },
};
