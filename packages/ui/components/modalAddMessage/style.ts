import type { SxProps } from '@mui/material';

interface ModalAddMessageStyleProps {
  [key: string]: SxProps;
}

export const modalAddMessageStyle: ModalAddMessageStyleProps = {
  rootSx: {},
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
  },

  inputGroupSx: {
    display: 'grid',
    gap: 1,
  },
};
