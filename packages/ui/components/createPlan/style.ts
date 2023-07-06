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
    // color: '#262C33',
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
    // mb: 2,
    mt: 2,
  },
  cancButton: {
    width: 'auto',
    borderRadius: '4px',
    backgroundColor: '#EAEAEA',
    textTransform: 'capitalize',
    mr: 1,
    padding: '4px 12px',
    color: '#000000',
    fontSize: '12px',
    boxShadow: 'none',
    '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root:hover': {
      backgroundColor: '#EAEAEA',
    },
  },
  saveButton: {
    width: 'auto',
    borderRadius: '4px',
    backgroundColor: 'primary.main',
    textTransform: 'capitalize',
    padding: '4px 12px',
    boxShadow: 'none',
    fontSize: '12px',
  },
};
