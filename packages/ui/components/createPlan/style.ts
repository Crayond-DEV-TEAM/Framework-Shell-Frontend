import type { SxProps } from '@mui/material';

interface CreatePlanStyleProps {
  [key: string]: SxProps;
}

export const createPlanStyle: CreatePlanStyleProps = {
  rootSx: {},
  content: {
    padding: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    pb: 1,
    fontWeight: '500',
    // mb: '6px',
  },

  inputGroupSx: {
    display: 'grid',
    // pb: 2,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  inputSxTwo: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
      height: '80px',
    },
  },
  whiteContent: {
    p: 3,
    backgroundColor: 'primary.contastText',
  },
  firstTextdark: {
    fontSize: '12px',
    fontWeight: 600,
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  },
};
