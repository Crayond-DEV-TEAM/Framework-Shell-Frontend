import type { SxProps } from '@mui/material';

interface DialogDrawerStyleProps {
  [key: string]: SxProps;
}

export const dialogDrawerStyle: DialogDrawerStyleProps = {
  rootSx: {},
  dialog: {
    width: '100%',
    maxWidth: 'auto',
    padding: '0 !important',
    '& .MuiPaper-root': {
      width: '100% !important',
      borderRadius: '4px',
      //backgroundImage: (props) => props?.noService && `url("/images/noserviceweb.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      //height: (props) => props?.noService && '400px',
    },
    '& .MuiDialogContent-root': {
      padding: '0px !important',
      position: 'relative',
    },
    '& .MuiDialog-container': {
      //padding: (props) => props?.padding ?? '',
    },
  },
  header: {
    //border: (props) => (props?.noService ? null : '1px solid #E4E8EE'),
    fontSize: '16px',
    //fontFamily: ExtraBold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  drawer: {
    '& .MuiDrawer-paper': {
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      //backgroundImage: (props) => props?.noService && `url("/images/noservicemob.svg")`,
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
};
