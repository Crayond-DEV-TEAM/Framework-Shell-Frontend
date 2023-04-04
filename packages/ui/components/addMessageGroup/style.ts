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
  totalLanguagesSx: {},

  dividerSx: {
    // border: '0.5px solid',
    // backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
    height: '412px',
    width: '1px',
  },
  totalDivider: {
    display: 'flex',
  },
  totalGrid: {
    display: 'flex',
  },
};
