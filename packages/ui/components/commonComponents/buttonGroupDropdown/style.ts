import type { SxProps } from '@mui/material';

interface ButtonGroupDropdownStyleProps {
  [key: string]: SxProps;
}

export const buttonGroupDropdownStyle: ButtonGroupDropdownStyleProps = {
  rootSx: {
    mr: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
};
