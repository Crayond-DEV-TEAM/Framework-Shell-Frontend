import type { SxProps } from '@mui/material';

interface MessageCardStyleProps {
  [key: string]: SxProps;
}

export const messageCardStyle: MessageCardStyleProps = {
  rootSx: {
    mx: '12px',
  },
  messageCard: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    cursor: 'pointer',
    borderRadius: '4px',
    height: '36px',
    // p: '6px 10px',
    '&:hover': {
      backgroundColor: '#EAF1EF',
      p: '6px 10px',
    },
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
    // '& .MuiPopover-root': {
    //   top: '275px',
    //   left: '184px',
    // },
    '& .MuiPopover-paper': {
      borderRadius: '8px',
      width: '106px',
      height: '70px',
      left: '184px !important',
    },
    '& .MuiMenu-list': {
      p: 1,
    },
    '& .MuiMenuItem-root': {
      p: 0.5,
    },
  },
  cancelbtnText: {
    textTransform: 'capitalize',
    backgroundColor: '#EAEAEA',
    color: '#5A5A5A',
    fontSize: '12px',
    fontWeight: 400,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#EAEAEA',
      boxShadow: 'none',
    },
  },
  savebtnText: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: '12px',
    boxShadow: 'none',
    fontWeight: 400,
    width: '64px',
    ml: 1,
    mr: 2,
  },
  totalFooterSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    paddingTop: '16px',
  },
  btnSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
