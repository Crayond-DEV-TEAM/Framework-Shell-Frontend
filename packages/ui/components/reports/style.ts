export const reports_styles = {
  headerBox: {
    paddingLeft: '20px',
  },

  commonTable: {
    margin: '24px',
    '& .MuiTableContainer-root': {
      borderRadius: '7px 7px 0px 0px',
    //   border: '1px solid' + theme.typography.color.tableHead,
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
      backgroundColor: '#F8F8F8',
      paddingBottom: '13px !important',
      '& .MuiTextField-root': {
        backgroundColor: '#FFFFFF',
      },
      '& .MuiIconButton-root': {
        backgroundColor: '#FFFFFF',
      },
    },
  },

  reportTabs: {
    backgroundColor: '#FFFFFF',
    margin: '25px',
    padding: '0px 14px 14px 14px',
    borderRadius: '8px',
    marginBottom: '0px',
    boxShadow: '0px 4px 10px #0000000A',
  },
};
