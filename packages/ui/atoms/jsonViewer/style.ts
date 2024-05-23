import type { SxProps } from '@mui/material';

interface JsonViewerStyleProps {
  [key: string]: SxProps;
}

export const jsonViewerStyle: JsonViewerStyleProps = {
  rootSx: {
    '& .jsoneditor': {
      height: '54vh',
      border: '1.5px solid #357968',
      borderRadius: '8px',
    },
    '& .jsoneditor-menu': {
      borderRadius: '7px 7px 0px 0px',
      backgroundColor: '#357968',
    },
    '& .jsoneditor-frame': {
      borderRadius: '7px',
    },
  },
};
