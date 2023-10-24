import type { SxProps } from '@mui/material';

interface SubscriptionPlanContentStyleProps {
  [key: string]: SxProps;
}

export const subscriptionPlanContentStyle: SubscriptionPlanContentStyleProps = {
  rootSx: {
    padding: '8px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignNoSpace: {
    display: 'flex',
    alignItems: 'center',
    mb: '12px',
  },
  alignNoSpaceCenter: {
    display: 'flex',
    alignItems: 'center',
    mb: '12px',
    justifyContent: 'center',
  },
  amountBg: {
    backgroundColor: '#D8E6E2',
    color: 'primary.main',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'right',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    ml: '8px',
  },
  keyItem: {
    fontSize: '12px',
    mr: '4px',
    fontWeight: 600,
  },
  valueItem: {
    fontSize: '12px',
    color: '#818181',
  },
  dot: {
    backgroundColor: '#AFAFAF ',
    padding: '3px',
    borderRadius: '50%',
    margin: '0px 8px 12px 8px',
  },
  redot: {
    backgroundColor: '#AFAFAF ',
    padding: '3px',
    borderRadius: '50%',
    margin: '0px 8px 0px 4px',
  },
  totalrevenue: {
    fontWeight: 600,
    fontSize: '16px',
    color: 'primary.main',
    textAlign: 'center',
  },
  upgradePlan: {
    fontSize: '12px',
    color: 'primary.main',
  },
  btn: {
    padding: '6px 16px',
    height: '28px',
    borderRadius: '4px',
    textTransform: 'capitalize',
    fontSize: '12px',
    width: 'auto',
  },
  sectionTwo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rate: {
    fontWeight: 600,
    fontsize: '22px',
    color: 'primary.main',
    textAlign: 'center',
  },
};
