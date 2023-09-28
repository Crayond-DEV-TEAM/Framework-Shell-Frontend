import type { SxProps } from '@mui/material';

interface UserProfileStyleProps {
  [key: string]: SxProps;
}

export const userProfileStyle: UserProfileStyleProps = {
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
      // width: '40% !important',
      // backgroundColor: 'red',
    },
  },
  dialogSx: {
    width: '400px',
    height: '208px',
    borderRadius: '16px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
  },

  inputGroupSx: {
    display: 'grid',
    p: 2,
    // pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  deleteSection: {
    backgroundColor: '#ffe6e6',
    padding: '3px 6px',
    marginLeft: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    '& .MuiBox-root': {
      boxShadow:
        'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
    },
  },
};
