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
    px: 0,
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
    width: '904px',
    height: '520px',
  },
  contentSx: {
    '&.MuiDialogContent-root': {
      paddingBottom: '0px',
    },
  },
};
