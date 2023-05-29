import type { SxProps } from '@mui/material';

interface SubscriptionDetailsStyleProps {
  [key: string]: SxProps;
}

export const subscriptionDetailsStyle: SubscriptionDetailsStyleProps = {
  rootSx: {},
  card: {
    padding: '16px 24px',
    backgroundColor: 'primary.contrastText',
    borderRadius: '8px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#AFAFAF',
    borderRadius: '50%',
    padding: '3px',
    margin: '0px 8px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
  },
  text: {
    fontSize: '12px',
    color: '#818181',
  },
  rootSxs: {
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
  tagTitle: {
    fontSize: '14px',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  body: {
    padding: '20px 16px',
    height: 'auto',
  },
  content: {
    padding: '24px',
  },
  dialogSx: {
    width: '430px',
    height: '531px',
  },
};
