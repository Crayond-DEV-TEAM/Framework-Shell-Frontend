import type { SxProps } from '@mui/material';

interface ShowValueStyleProps {
  [key: string]: SxProps;
}

export const showValueStyle: ShowValueStyleProps = {
  rootSx: {
    mr: '8px'
  },
  eyeSx: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    width: '34px',
    height: '34px',
  },
};
