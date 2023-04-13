export const dialogContent_style = {
  headerBox: {
    paddingLeft: '20px',
  },

  commonTable: {
    margin: '24px',
    border: '1px solid #EAEAEA',
    '& .MuiTableContainer-root': {
      borderBottom: '1px solid #EAEAEA',
      borderRadius: '7px 7px 0px 0px',
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
      backgroundColor: '#F8F8F8',
      paddingTop: '10px !important',
      paddingBottom: '13px !important',
      '& .MuiInputBase-root': {
        backgroundColor: '#FFFFFF',
        width: '332px',
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

  leftContent: {
    padding: '24px',
    borderRight: '1px solid #E0E0E0',
  },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
    lineHeight: '30px',
  },
  rightContent: {
    padding: '24px',
    height: '458px',
    overflowX: 'scroll',
    '& .MuiFormControlLabel-root': {
      marginLeft: '0px !important',
    },
    '& .MuiCheckbox-root': {
      marginRight: '8px',
      border: '1px solid #B3B3B3',
    },
  },

  field: {
    marginBottom: '12px',
    '& .MuiInputBase-root': {
      backgroundColor: '#FFFFFF',
    },
  },

  Label: {
    color: '#262C33',
    fontSize: '12px',
    marginBottom: '6px',
  },

  checkBoxGroup: {
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
      fontWeight: 500,
      '& .active': {
        color: '#357968',
      },
    },
  },

  innerBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '25px',
  },

  pushDetails: {
    color: '#262C33',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '15px',
  },
};
