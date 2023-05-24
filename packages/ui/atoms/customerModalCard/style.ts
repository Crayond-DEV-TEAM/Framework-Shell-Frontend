import type { SxProps } from '@mui/material';

interface CustomerModalCardStyleProps {
  [key: string]: SxProps;
}

export const customerModalCardStyle: CustomerModalCardStyleProps = {
  rootSx: {
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    backgroundColor: '#FFFFFF',
    padding: '12px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
  },
  badge: {
    backgroundColor: '#FAEDDC',
    borderRadius: '6px',
    color: '#FF980E',
    fontSize: '10px',
    padding: '4px 8px',
  },
  dot: {
    backgroundColor: '#AFAFAF',
    padding: '3px',
    borderRadius: '50%',
    margin: '8px',
  },
  bottomText: {
    fontSize: '12px',
    color: '#818181',
  },
  bottomAlign: {
    display: 'flex',
    alignItems: 'center',
  },
};
