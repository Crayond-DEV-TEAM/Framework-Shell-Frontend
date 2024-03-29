import type { SxProps } from '@mui/material';

interface SubscriptionStyleProps {
  [key: string]: SxProps;
}

export const subscriptionStyle: SubscriptionStyleProps = {
  rootsSx: {
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    backgroundColor: '#FFFFFF',
    padding: '12px',
    mb: 1,
    cursor: 'pointer',
  },
  rootsSxSelected: {
    borderRadius: '8px',
    border: '1px solid #357968',
    backgroundColor: '#F0F5F4',
    padding: '12px',
    mb: 1,
    cursor: 'pointer',
  },
  rootSx: {
    padding: '24px',
  },
  commonTable: {
    bgcolor: '#fff',
    // margin: {
    //   lg: '0px 12px',
    //   md: '0px 12px',
    //   sm: '10px 20px',
    //   xs: '10px 0px',
    // },
    // padding: '16px 20px',
    // margin: '24px 31px',
    borderRadius: '8px',
    // height: 'calc(100vh - 100px)',
    border: '1px solid #EAEAEA',
    '& .css-x5ymgk': {
      gap: '0px',
      // marginBottom: '14px',
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
    // '& .TEXT': {
    //   width: '40% !important',
    //   // backgroundColor: 'red',
    // },
    '& .MuiTableRow-root .stickyRight:nth-last-of-type(2n)': {
      right: '84px',
    },
    '& .MuiFormControlLabel-root': {
      marginRight: '0px',
    },
    '& .MuiTableCell-root': {
      padding: '6px 16px 6px 16px',
    },
    '& .MuiTableSortLabel-root': {
      width: '136px',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px',
    },
    // '& .SWITCH label':{
    //   display:'flex',
    //   gap:'6px',
    //   justifyContent:'center'
    // },
    // '& .MuiTableCell-root p':{
    //   display:'flex',
    //   justifyContent:'center'
    // },
    // '& .css-i5q2k0': {
    //   display:'flex',
    //   justifyContent:'center'
    // }
  },
  dialogSx: {
    width: '400px',
    height: '531px',
  },
  dialogMapSx: {
    width: '823px',
    height: '588px',
  },
};
