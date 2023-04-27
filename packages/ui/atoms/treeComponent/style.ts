import type { SxProps } from '@mui/material';

interface TreeComponentStyleProps {
  [key: string]: SxProps;
}

export const treeComponentStyle: TreeComponentStyleProps = {
  rootSx: {},
  child: {
    fontSize: '14px',
    color: '#29302B',
  },
  nestedChild: {
    fontSize: '14px',
    color: '#818181',
  },
};
