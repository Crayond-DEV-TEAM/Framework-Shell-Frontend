import type { SxProps } from '@mui/material';

interface ToggleButtonStyleProps {
  [key: string]: SxProps;
}

export const toggleButtonStyle: ToggleButtonStyleProps = {
  activeSx: {
    opacity: 1,
    color: 'border.focus',
    fontSize: '12px',
  },
  nameActiveSx: {
    fontWeight: 600,
    color: '#fff',
  },
  nameInactiveSx: {
    // mr: '0.5px',
    fontWeight: 500,
  },
  radioSx: {
    color: 'text.secondary',
    fontSize: '12px',
  },
  buttonactiveSx: {
    textTransform: 'capitalize',
    boxShadow: 'none',
    borderColor: 'primary.main',
    color: '#fff',
    padding: 0.5,
    fontWeight: '600',
  },
  buttoninactiveSx: {
    backgroundColor: '#EAEAEA',
    fontSize: '12px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    color: '#5A5A5A',
    padding: 0.5,
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#EAEAEA',
      boxShadow: 'none',
    },
  },
};
