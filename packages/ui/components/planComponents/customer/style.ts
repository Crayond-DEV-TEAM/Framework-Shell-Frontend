import type { SxProps } from '@mui/material';

interface CustomerStyleProps {
  [key: string]: SxProps;
}

export const customerStyle: CustomerStyleProps = {
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
    '& .MuiTablePagination-root:last-child': {
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
    // }
  },

};
