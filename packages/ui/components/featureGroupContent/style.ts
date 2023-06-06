import type { SxProps } from '@mui/material';

interface FeatureGroupContentStyleProps {
  [key: string]: SxProps;
}

export const featureGroupContentStyle: FeatureGroupContentStyleProps = {
  rootSx: {
    padding: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    mb: '8px',
  },
  labeltwoSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '600',
    mb: '8px',
  },

  inputGroupSx: {
    display: 'grid',
    pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  inputBigSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      height: '154px',
    },
  },
  text: {
    fontSize: '12px',
    width: '244px',
    padding: '10px',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
  },
  alignTwo: {
    display: 'flex',
    alignItems: 'center',
  },
  texttwo: {
    fontSize: '12px',
  },
};
