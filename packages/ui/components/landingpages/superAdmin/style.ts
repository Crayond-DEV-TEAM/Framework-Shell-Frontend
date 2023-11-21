import type { SxProps } from '@mui/material';

interface SuperAdminStyleProps {
  [key: string]: SxProps;
}

export const superAdminStyle: SuperAdminStyleProps = {
  rootSx: {},
  commonTable: {
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    bgcolor: '#fff',
    // margin: {
    //   lg: '0px 12px',
    //   md: '0px 12px',
    //   sm: '10px 20px',
    //   xs: '10px 0px',
    // },
    padding: '16px 20px',
    // margin: '24px 31px',
    // borderRadius: '8px',
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
      justifyContent:'center'
    },
    '& .MuiTableCell-root p':{
      display:'flex',
      justifyContent:'center'
    },
    '& .css-i5q2k0': {
      display:'flex',
      justifyContent:'center'
    }
  },
};
