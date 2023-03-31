import type { SxProps } from '@mui/material';

interface DialogDrawerStyleProps {
  [key: string]: SxProps;
}

export const dialogDrawerStyle: DialogDrawerStyleProps = {
  dialog: {
    width: '100%',
    maxWidth: 'auto',
    '& .MuiPaper-root': {
      //width: '100% !important',
      borderRadius: '4px',
      //backgroundImage: (props) => props?.noService && `url("/images/noserviceweb.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      //height: '400px',
      // width: '904px',
      // height: '604px',
    },
    '& .MuiDialogContent-root': {
      padding: '0px !important',
      position: 'relative',
    },
    '& .MuiDialog-container': {
      // padding: (props) => props?.padding ?? '',
    },
  },
  header: {
    border: '1px solid #E4E8EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      // backgroundImage: (props) => props?.noService && `url("/images/noservicemob.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPositionY: 'center',
    },
    '& .MuiContainer-root': {
      padding: '0px',
    },
  },
  component: {
    overflow: 'auto',
    height: '450px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  footer: {
    position: 'sticky',
    width: '100%',
    bottom: '0',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'typography.header',
  },
  headAlign: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnBg: {
    backgroundColor: '#EAEAEA',
    borderRadius: '4px',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  savebtnBg: {
    backgroundColor: 'primary.main',
    borderRadius: '4px',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  cancelbtnText: {
    color: '#5A5A5A',
    fontSize: '12px',
    fontWeight: 400,
  },
  savebtnText: {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 400,
  },
  switch: {
    color: '#5A5A5A',
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '12px',
  },
  content: {
    '& .MuiDialogTitle-root+.css-uwas4w-MuiDialogContent-root': {
      padding: '12px !important',
    },
  },
};
