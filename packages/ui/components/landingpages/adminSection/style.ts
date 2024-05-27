import type { SxProps } from '@mui/material';

interface AdminSectionStyleProps {
  [key: string]: SxProps;
}

export const adminSectionStyle: AdminSectionStyleProps = {
  rootSx: {},
  commonTable: {
    borderRadius: '8px',
    bgcolor: '#fff',
    // margin: {
    //   lg: '0px 12px',
    //   md: '0px 12px',
    //   sm: '10px 20px',
    //   xs: '10px 0px',
    // },
    padding: '16px',
    // margin: '24px 31px',
    // borderRadius: '8px',
    // height: 'calc(100vh - 100px)',
    border: '1px solid #EAEAEA',
    '& .SWITCH label': {
      display: 'flex',
      gap: '6px',
    },
    '& .MuiTableRow-root': {
      cursor: 'pointer',
    },
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
  },
  customSwitch: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  customSwitchStatus: {
    fontSize: '14px',
  },
  dialogSx: {
    width: '50vw',
    height: '85vh',
    '&.MuiDialog-paper': {
      borderRadius: '8px',
    },
  },
};
