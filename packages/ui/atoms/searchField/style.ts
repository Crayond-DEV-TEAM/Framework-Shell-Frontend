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
};
