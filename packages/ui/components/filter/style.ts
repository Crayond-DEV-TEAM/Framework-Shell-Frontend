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
    // '& .MuiPopover-root': {
    //   top: '80px!improtant',
    //   left: '541px!important',
    // },

    '& .MuiPopover-paper': {
      width: '342px',
      height: '360px',
      borderRadius: '8px',
      mt: 1,
      // ml: '-116px',
    },
  },
  totalFilterSideSx: {
    // '&.MuiPopover-root': {
    //   position: 'fixed',
    //   top: '-56px',
    //   left: '40px',
    // },
    // position: 'fixed',
    // top: '-56px',
    // left: '37px',
    transformOrigin: '0px 0px !important',
    '& .MuiPopover-paper': {
      width: '186px',
      height: '360px',
      borderRadius: '8px',
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
    alignItems: 'center',
    py: 1,
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  totalCardSx: {
    borderBottom: '1px solid #E0E0E0',
    pb: 1,
  },
  contentBoxSx: {
    px: 2.5,
  },
  footerSx: {
    position: 'absolute',
    bottom: '0px',
    py: 1.75,
    borderTop: '1px solid #E0E0E0',
    width: '100%',
    left: '0px',
    right: '0px',
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
    fontSize: '12px',
    mr: 2.5,

    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#357968',
    },
  },
  footerCancelBtn: {
    width: '78px',
    boxShadow: 'none',
    backgroundColor: '#EAEAEA',
    color: '#5A5A5A',
    mr: 1,
    p: '5px',
    fontSize: '12px',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#EAEAEA',
    },
  },

  checkBoxSx: {
    borderRadius: '4px',
    width: 18,
    height: 18,
    boxShadow: 'none',
    border: '1px solid',
    position: 'relative',
    borderColor: '#E0E0E0',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      boxShadow: 'none',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
    },
  },
  checkSecondBoxSx: {
    backgroundColor: 'mbf.main',
    borderColor: 'purple.600',
    'input:hover ~ &': {
      backgroundColor: 'mbf.main',
    },
  },
  quesSx: {
    fontSize: '12px',
    fontWeight: 400,
    ml: 1,
  },
  dateInputSx: {
    '& .MuiOutlinedInput-input': {
      width: '100%',
      fontWeight: 400,
      p: '4px',
    },
    '& .MuiOutlinedInput-root': {
      p: '1px',
    },
  },
  contentBoxSideSx: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    px: 2,
    pb: 1,
  },
  clearSX: {
    display: 'flex',
    alignItems: 'center',
  },
  footerClearSx: {
    width: '84px',
    boxShadow: 'none',
    backgroundColor: '#FDDFE1',
    color: '#F44F5A',
    ml: 2.5,
    p: 1,
    fontSize: '12px',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#EAEAEA',
    },
  },
  totalSideCardSx: {
    width: '186px',
    height: '360px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  parentSX: {
    display: 'flex',
    gap: 2,
    backgroundColor: '#000',
    position: 'relative',
  },
  dateSx: {
    // mt: 1,
    borderTop: '1px solid #E0E0E0',
  },
  alternateButtonPosition: {
    position: 'relative',
    left: '100',
  },
};
