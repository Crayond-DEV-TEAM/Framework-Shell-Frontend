import type { SxProps } from '@mui/material';

interface FilterStyleProps {
  [key: string]: SxProps;
}

export const filterStyle: FilterStyleProps = {
  rootSx: {},
  filterSx: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
  },
  totalFilterSx: {
    '& .MuiPopover-paper': {
      width: '342px',
      height: '360px',
      borderRadius: '8px',
    },
  },
  totalFilterSideSx: {
    '& .MuiPopover-paper': {
      // top: '300px !important',
      // left: ' 952px !important',
    },
  },
  headerSx: {
    p: 1.75,
    borderBottom: '1px solid #E0E0E0',
    fontSize: '18px',
    fontWeight: '600',
    color: 'typography.text',
  },
  CardSx: {
    display: 'flex',
    p: 1.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E0E0',
    cursor: 'pointer',
  },
  contentBoxSx: {
    px: 2,
  },
  footerSx: {
    position: 'absolute',
    bottom: '0px',
    py: 1.75,
    borderTop: '1px solid #E0E0E0',
    width: '100%',
  },
  subFooterSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  footerBtn: {
    width: '80px',
    boxShadow: 'none',
    backgroundColor: '#357968',
    fontSize: '14px',
    mr: 1,

    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#357968',
    },
  },
  footerCancelBtn: {
    width: '80px',
    boxShadow: 'none',
    backgroundColor: '#EAEAEA',
    color: '#5A5A5A',
    mr: 1,
    fontSize: '14px',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#EAEAEA',
    },
  },
};
