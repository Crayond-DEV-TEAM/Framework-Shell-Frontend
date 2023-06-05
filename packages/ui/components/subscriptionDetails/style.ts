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
  drawerBody: {
    pt: 0,
    pb: 2,
    px: 2,
  },
  drawerTxt: {
    color: '#818181',
    fontSize: '12px',
    ml: '12px',
  },
  cardDrawer: {
    border: '1px solid #EAEAEA',
    borderRadius: '8px',
    padding: '12px',
    ml: '50px',
  },
  dashedLine: {
    borderLeft: '2px dashed #EAEAEA',
    position: 'absolute',
    left: '36px',
    right: '50px',
    top: '90px',
    bottom: '50px',
    height: '100px',
  },
};
