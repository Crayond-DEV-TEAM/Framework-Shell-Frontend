import type { SxProps } from '@mui/material';

interface AddMessageGroupStyleProps {
  [key: string]: SxProps;
}

export const addMessageGroupStyle: AddMessageGroupStyleProps = {
  rootSx: {},
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
  },

  inputGroupSx: {
    display: 'grid',
    gap: 1,
    pb: 2,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
    },
  },
};
