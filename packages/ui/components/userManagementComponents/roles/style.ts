import type { SxProps } from '@mui/material';

interface RolesStyleProps {
  [key: string]: SxProps;
}

export const rolesStyle: RolesStyleProps = {
  rootSx: {
    // border: '1px solid #EAEAEA',
    // borderRadius: '8px',
    // backgroundColor: 'primary.contrastText',
    // padding: '20px 26px',
  },
  commonTable: {
    bgcolor: '#fff',
    // margin: {
    //   lg: '0px 12px',
    //   md: '0px 12px',
    //   sm: '10px 20px',
    //   xs: '10px 0px',
    // },
    padding: '16px 20px',
    // margin: '24px 31px',
    borderRadius: '8px',
    // height: 'calc(100vh - 100px)',
    border: '1px solid #EAEAEA',
    '& .css-x5ymgk': {
      gap: '0px',
      marginBottom: '14px',
      padding: 0,
    },
    '& .MuiTableContainer-root': {
      borderRadius: '7px 7px 0px 0px',
      border: '1px solid #EAEAEA',
    },
    '& .css-qx9vaq-MuiTablePagination-root:last-child': {
      borderRadius: '0px 0px 7px 7px',
      border: '1px solid #EAEAEA',
      width: '100%',
    },
    '& .LABEL': {
      width: '40% !important',
      // backgroundColor: 'red',
    },
    '& .SWITCH label':{
      display:'flex',
      gap:'6px',
    },
  },
  dialogSx: {
    width: '500px',
    height: '450px',
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
};
