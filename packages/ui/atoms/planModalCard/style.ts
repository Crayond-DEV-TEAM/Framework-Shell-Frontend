import type { SxProps } from '@mui/material';

interface PlanModalCardStyleProps {
  [key: string]: SxProps;
}

export const planModalCardStyle: PlanModalCardStyleProps = {
  rootSx: {
    backgroundColor: '#F5F5F5',
    padding: '20px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
    mb: '6px',
  },
  rate: {
    fontSize: '12px',
    fontWeight: 600,
    textAlign: 'right',
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
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    borderBottom: '1px solid #DBDBDB',
    margin: '12px 0px',
  },
};
