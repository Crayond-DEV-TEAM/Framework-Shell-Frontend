import type { SxProps } from '@mui/material';

interface TreeComponentStyleProps {
  [key: string]: SxProps;
}

export const treeComponentStyle: TreeComponentStyleProps = {
  rootSx: {},
  child: {
    fontSize: '14px',
    color: '#29302B',
    textTransform: 'captialize',
  },
  nestedChild: {
    fontSize: '14px',
    color: '#818181',
    textTransform: 'captialize',
  },
  mild: {
    borderBottom: '1px solid #cccccc',
    position: 'relative',
    left: '80px',
    top: '-104px',
    // width: '730px',
  },
};
