import type { SxProps } from '@mui/material';

interface ModalAddMessageStyleProps {
  [key: string]: SxProps;
}

export const modalAddMessageStyle: ModalAddMessageStyleProps = {
  rootSx: { paddding: '12px' },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
    pb: 1,
  },

  inputGroupSx: {
    display: 'grid',
    pb: 2,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
    },
  },
};
