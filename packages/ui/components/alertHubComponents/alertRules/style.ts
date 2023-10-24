export const alertRuleStyles = {
  commonTable: {
    mx: 3,
    // border: "1px solid #EAEAEA",
    '& .MuiTableContainer-root': {
      borderBottom: '1px solid #EAEAEA',
      borderRadius: '7px 7px 0px 0px',
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
      backgroundColor: '#F6F6F6',
      // paddingTop: '10px !important',
      paddingBottom: '12px !important',
      '& .MuiInputBase-root': {
        backgroundColor: '#FFFFFF',
        // width: '332px',
      },
      '& .MuiIconButton-root': {
        backgroundColor: '#FFFFFF',
      },
    },
    '& button': {
      textTransform: 'capitalize !important',
      '&:hover': {
        backgroundColor: '#357968',
      },
    },
  },
};
