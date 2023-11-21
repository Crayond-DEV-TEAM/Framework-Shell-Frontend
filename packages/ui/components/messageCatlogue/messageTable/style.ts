import type { SxProps } from '@mui/material';

interface MessageTableStyleProps {
  [key: string]: SxProps;
}

export const messageTableStyle: MessageTableStyleProps = {
  rootSx: {},
  commonTable: {
    bgcolor: '#fff',
    margin: {
      lg: '0px 12px',
      md: '0px 12px',
      sm: '10px 20px',
      xs: '10px 0px',
    },
    padding: '20px 26px',
    // margin: '24px 31px',
    borderRadius: '8px',
    height: 'calc(100vh - 100px)',
    border: '1px solid #EAEAEA',
    '& .css-x5ymgk': {
      gap: '0px',
      marginBottom: '14px',
      padding: 0,
    },
    '& .SWITCH label':{
      display:'flex',
      gap:'6px',
    },
    // '& .MuiTableRow-root':{
    //   cursor:'pointer'
    // },
  },
  totalTableSx: {
    padding: '0px 12px',
  },
  tableHeaderSx: {
    // paddding: '40px',
  },
  cancelbtnText: {
    textTransform: 'capitalize',
    backgroundColor: '#EAEAEA',
    color: '#5A5A5A',
    fontSize: '12px',
    fontWeight: 400,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#EAEAEA',
      boxShadow: 'none',
    },
  },
  dialogSx: {
    width: '904px',
    height: '604px',
  },
  contentSx: {
    '&.MuiDialogContent-root': {
      paddingBottom: '0px',
    },
  },
  savebtnText: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: '12px',
    boxShadow: 'none',
    fontWeight: 400,
    width: '64px',
    ml: 1,
    mr: 2,
  },
  totalFooterSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    paddingTop: '16px',
  },
  btnSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // addSx: { width: '100%', maxWidth: '230px', margin: '0px 21px' },
};
