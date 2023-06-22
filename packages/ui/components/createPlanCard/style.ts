import type { SxProps } from '@mui/material';

interface CreatePlanCardStyleProps {
  [key: string]: SxProps;
}

export const createPlanCardStyle: CreatePlanCardStyleProps = {
  rootSx: {
    backgroundColor: '#FCFCFC',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #EAEAEA',
    my: 1,
  },
  mainSx: {
    backgroundColor: '#FCFCFC',
    bordeRadius: '8px',
    padding: '16px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
  },
  firstText: {
    fontSize: '12px',
  },
  firstTextdark: {
    fontSize: '12px',
    fontWeight: 600,
  },
  secondText: {
    fontSize: '14px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    pb: 2,
    fontWeight: '500',
    // mb: '6px',
  },
  typographyTxt: {
    fontSize: '12px',
  },
  borderLine: {
    border: '1px solid #EAEAEA',
    margin: '16px 0px',
  },
};
