import type { SxProps } from '@mui/material';

interface SingleFileComponentStyleProps {
  [key: string]: SxProps;
}

export const singleFileComponentStyle: SingleFileComponentStyleProps = {
  rootSx: {
    mr: '4px'
  },
  eyeSx: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    width: '34px',
    height: '34px',
  },
};

