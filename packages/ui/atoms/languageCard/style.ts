import type { SxProps } from '@mui/material';

interface LanguageCardStyleProps {
  [key: string]: SxProps;
}

export const languageCardStyle: LanguageCardStyleProps = {
  rootMainSx: {
    padding: '12px',
    backgroundColor: '#F7F7F7',
    borderRadius: '8px',
    width: '100%',
    mb: 1,
  },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
  },

  inputGroupSx: {
    display: 'grid',
    gap: 1,
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
    },
    backgroundColor: 'primary.contrastText',
  },
};
