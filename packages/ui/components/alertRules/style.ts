export const alertRuleStyles = {
  commonTable: {
    margin: '24px',
    // border: "1px solid" + theme.typography.color.tableHead,
    '& .MuiTableContainer-root': {
      //   borderBottom: '1px solid' + theme.typography.color.tableHead,
      borderRadius: '7px 7px 0px 0px',
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
      backgroundColor: '#F8F8F8',
      paddingTop: '10px !important',
      paddingBottom: '13px !important',
      '& .MuiTextField-root': {
        backgroundColor: '#FFFFFF',
      },
      '& .MuiIconButton-root': {
        backgroundColor: '#FFFFFF',
      },
    },
    '& button': {
      textTransform: 'capitalize !important',
      '&:hover': {
        // backgroundColor: theme.palette.primary.main,
      },
    },
  },
};
