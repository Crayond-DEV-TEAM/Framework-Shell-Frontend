import type { SxProps } from '@mui/material';

interface DropDownStyleProps {
  [key: string]: SxProps;
}

export const dropDownStyle: DropDownStyleProps = {
  rootSx: {
    '.MuiPaper-root': {
      left: 4,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1.5px',
      borderColor: 'border.main',
      borderRadius: 2,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'border.main',
    },
    '& .MuiSelect-icon': {
      fill: 'primaryTints.A100',
      opacity: '40%',
    },
  },
  optionListSx: {
    boxShadow: 1,
    '& .MuiPaper-root': {
      border: '1.5px solid',
      borderColor: 'grey.200',
      boxShadow: '0px -5px 10px #0000000A',
      mt: 1,
    },
  },
  menuitem: {
    direction: 'rtl',
  },
  menuitemhidden: {
    display: 'none',
  },

  Label: {
    color: '#262C33',
    fontSize: '12px',
    marginBottom: '6px',
  },

  required: {
    color: 'red',
  },
};
