import type { SxProps } from '@mui/material';

interface MessageCardStyleProps {
  [key: string]: SxProps;
}

export const messageCardStyle: MessageCardStyleProps = {
  rootSx: {
    px: '12px',
  },
  messageCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    borderRadius: '4px',
    p: 0.75,
  },
  dot: {
    mr: 0.6,
    fontSize: '12px',
  },
  messageTitle: {
    fontSize: '14px',
    fontWeight: 400,
    pl: 0.3,
    color: '#5A5A5A',
  },
  profileSec: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // px: '13px',
    // py: '12px',
    '& .MuiButtonBase-root-MuiMenuItem-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '13px',
      py: '12px',
    },
    '& .MuiList-root-MuiMenu-list': {
      padding: '0 !important',
    },
  },
  menutext: {
    pr: 0.5,
    fontSize: '12px',
    color: 'typography.transparent',
  },
  menuSx: {
    '& .MuiMenu-list': {
      p: 1,
    },
    '& .MuiMenuItem-root': {
      p: 0.5,
    },
  },
};
