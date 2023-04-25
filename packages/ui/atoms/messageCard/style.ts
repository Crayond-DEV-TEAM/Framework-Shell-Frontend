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
    width: '206px',
    height: '36px',
    backgroundColor: '#EAF1EF',
    padding: '8px 10px',
    p: '6px 10px',
  },
  unSelectedCard: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    cursor: 'pointer',
    borderRadius: '4px',
    width: '206px',
    height: '36px',
    backgroundColor: 'none',
    padding: '6px 10px',
    p: '6px 10px',
  },
  dot: {
    mr: 0.6,
    fontSize: '12px',
  },
  serviceTitle: {
    fontSize: '14px',
    fontWeight: 500,
    pl: 0.3,
    color: '#357968',
  },
  unslectedServiceTitle: {
    fontSize: '14px',
    fontWeight: 400,
    pl: 0.3,
    color: 'color.green',
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
