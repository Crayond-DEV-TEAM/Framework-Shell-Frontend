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
    width: '500px',
    height: '450px',
  },
  tree:{
    '& MuiGrid-root':{
      padding:'0px !important'
    }
  }
};
