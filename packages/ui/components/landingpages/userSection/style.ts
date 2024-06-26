import type { SxProps } from '@mui/material';

interface UserSectionStyleProps {
  [key: string]: SxProps;
}

export const userSectionStyle: UserSectionStyleProps = {
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
    // '& .LABEL': {
    //   width: '40% !important',
    //   // backgroundColor: 'red',
    // },
  },

  dialogSx: {
    width: '40vw',
    height: '70vh',
    '& .MuiDialog-paper': {
      borderRadius: '8px',
    },
  },
  padd: {
    p: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
  },

  inputGroupSx: {
    display: 'grid',
    // pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
};
