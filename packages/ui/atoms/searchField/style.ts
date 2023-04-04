import type { SxProps } from '@mui/material';

interface SearchFieldStyleProps {
  [key: string]: SxProps;
}

export const searchFieldStyle: SearchFieldStyleProps = {
  rootSx: {
    width: '761px',
    height: '84px',
    px: '24px',
    py: '22px',
  },
  searchBoxSx: {
    // position: 'relative',
    border: '1px solid #EAEAEA',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginLeft: 0,
    display: 'inline-flex',
    p: 0,
    width: '761px',
    height: '64px',
    px: '24px',
    py: '22px',
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
    display: 'flex',
    alignItems: 'center',
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
    position: 'absolute !important',
    left: '-205px !important',
    backgroundColor: 'white',
    top: '30px !important',
    width: '299px',
    height: '191px',
    boxShadow: '0px 1px 6px #0000002B',
    borderRadius: '8px',
    '& .MuiPopper-root MuiPopper-root': {
      position: 'absolute',
      left: '292px',
      backgroundColor: 'white',
      top: '210px',
      width: '299px',
      height: '191px',
    },
    // '& .MuiPopover-paper': {
    //   width: '299px',
    //   height: '191px',
    //   mt: '8px',
    //   backgroundColor: 'primary.contrastText',
    //   borderRadius: '8px',
    //   top: '208px !important',
    //   left: '290px !important',
    // },
  },
  text: {
    height: '160px',
    overflowY: 'auto',
    cursor: 'pointer',
    '& .MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters.MuiListItemButton-root.MuiListItemButton-gutters.css-fy0xc7-MuiButtonBase-root-MuiListItemButton-root':
      {
        padding: '8px 24px',
      },
    '& .MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters.MuiListItemButton-root.MuiListItemButton-gutters.css-fy0xc7-MuiButtonBase-root-MuiListItemButton-root:hover':
      {
        backgroundColor: ' #eaf1f0',
        borderRadius: '6px',
      },

    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 600,
    },
    '& li.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.css-1kukscj-MuiListItem-root': {
      padding: '8px 24px',
    },
    '& li.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.css-1kukscj-MuiListItem-root:hover': {
      // background: 'var(--unnamed-color-357968) 0% 0% no-repeat padding-box',
      backgroundColor: ' #eaf1f0',
      borderRadius: '6px',
      // padding: '8px 12px ',
      // margin: '11px',
    },
    '& .MuiListItemText - root': {
      padding: '20px 24px',
    },
  },

  title: {
    fontSize: '10px',
    color: '#5A5A5A',
    pt: '15px',
    pl: '16px',
  },
};
