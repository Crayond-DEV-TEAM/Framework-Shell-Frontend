import type { SxProps } from '@mui/material';

interface TableHeaderStyleProps {
  [key: string]: SxProps;
}

export const tableHeaderStyle: TableHeaderStyleProps = {
  rootSx: {},
  titleSx: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#29302B',
  },
  totalHeaderSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSx: {
    borderRadius: '8px',
  },
};
