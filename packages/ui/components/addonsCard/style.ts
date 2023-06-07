import type { SxProps } from '@mui/material';

interface AddOnsCardStyleProps {
  [key: string]: SxProps;
}

export const addOnsCardStyle: AddOnsCardStyleProps = {
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
    mt: '8px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    pb: 2,
    fontWeight: '500',
    // mb: '6px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
  },
  rootSx: {
    // padding: '16px',
    // // borderBottom: '1px solid #EAEAEA',
    // mt: '-20px',
  },
  borderLine: {
    border: '1px solid #EAEAEA',
    margin: '16px 0px',
  },
};
