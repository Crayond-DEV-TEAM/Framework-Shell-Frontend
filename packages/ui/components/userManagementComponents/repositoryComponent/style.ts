import type { SxProps } from '@mui/material';

interface RepositoryComponentStyleProps {
  [key: string]: SxProps;
}

export const repositoryComponentStyle: RepositoryComponentStyleProps = {
  rootSx: {
    backgroundColor: 'primary.contrastText',
    // border: '1px solid black',
  },
  dialogSx: {
    width: '60vw',
    height: '80vh',
    '&.MuiDialog-paper': {
      borderRadius: '8px',
    },
  },
};
