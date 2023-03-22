import type { SxProps } from '@mui/material';

interface DialogDrawerStyleProps {
  [key: string]: SxProps;
}

export const dialogDrawerStyle: DialogDrawerStyleProps = {
  titleRootSx: {
    fontSize: 14,
    fontWeight: 500,
  },
  dialogRootSx: {
    width: '640px',
  },
  rootSx: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '640px',
  },
  closeOutsx: {
    top: '55px',
    right: '120px',
    width: '30px',
    height: '30px',
    position: 'fixed',
    borderRadius: '50%',
    backgroundColor: '#fff',
    padding: '15px',
  },
  dialogSx: {
    width: '640px',
  },
};
