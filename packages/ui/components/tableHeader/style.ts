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
    textTransform: 'capitalize',
  },
  totalHeaderSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // p: 2,
    // px: 0,
  },
  leftSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSx: {
    borderRadius: '8px',
    textTransform: 'capitalize',
  },
  dialogSx: {
    width: '1020px',
    // height: '520px',
  },
  contentSx: {
    '&.MuiDialogContent-root': {
      paddingBottom: '0px',
    },
  },
};
