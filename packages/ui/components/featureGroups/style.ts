import type { SxProps } from '@mui/material';

interface FeatureGroupsStyleProps {
  [key: string]: SxProps;
}

export const featureGroupsStyle: FeatureGroupsStyleProps = {
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
      right: '70px',
    },
    '& .MuiFormControlLabel-root': {
      marginRight: '0px',
    },
    '& .MuiTableCell-root': {
      padding: '0px 9px 0px 7px',
    },
    '& .MuiTableSortLabel-root': {
      width: '186px',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px',
    },
    // '& .MuiTableCell-sizeSmall TEXT  activesubscription': {
    //   width: '136px',
    // },
  },
  dialogSx: {
    width: '400px',
    height: '500px',
  },
  padd: {
    p: '24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
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
  inputBigSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      height: '80px',
    },
  },
};
