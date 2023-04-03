import type { SxProps } from '@mui/material';

interface SearchFieldStyleProps {
  [key: string]: SxProps;
}

export const searchFieldStyle: SearchFieldStyleProps = {
  rootSx: {},
  searchBoxSx: {
    position: 'relative',
    borderRadius: '0px',
    marginLeft: 0,
    display: 'inline-flex',
    p: 0,
    // '& MuiPopover-paper': {
    //   width: '261px',
    //   height: '140px',
    //   backgroundColor: 'red !important',
    // },
    // '& .MuiPopover-paper': {
    //   bgcolor: 'red !important',
    // },
  },
  searchFieldSx: {
    '& .MuiOutlinedInput-root': {
      px: 0,
      py: 1,
      backgroundColor: 'tranparent',
      color: '#025140',
    },

    '& .MuiOutlinedInput-input': {
      padding: '0px',
      fontSize: '14px',
      color: '#818181',
    },
    // Refer -use for no border & change border-color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#EAEAEA',
    },
  },
  searchInputSx: {
    p: 0,
  },
  popove: {
    '& .MuiPopover-paper': {
      width: '299px',
      height: '191px',
      mt: '8px',
      backgroundColor: 'primary.contrastText',
      borderRadius: '8px',
    },
  },
  text: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 400,
    },
    '& li.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.css-1kukscj-MuiListItem-root:hover': {
      // background: 'var(--unnamed-color-357968) 0% 0% no-repeat padding-box',
      background: ' #eaf1f0 0% 0% no-repeat padding-box',
      borderRadius: '6px',
    },
  },

  listing: {},
};
