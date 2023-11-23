export const emailTab_style = {
  root: {
    padding: '31px 24px',
  },

  alertConfigTab: {
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'crayond_medium',
    fontWeight: 600,
    paddingBottom: '8px !important',
    '&:nth-child(1)': {
      marginLeft: '38px ',
      sm: {
        marginLeft: '20px',
      },
    },
    '&:nth-child(2)': {
      margin: '0 40px ',
      sm: {
        margin: '0 20px',
      },
    },
    sm: {
      fontSize: '13px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },

  alertConfigTabTxt: {
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'crayond_medium',
    fontWeight: 600,
    // color: theme.palette.primary.mailInput,
    // borderBottom: '3px solid' + theme.palette.primary.main,
    paddingBottom: '8px !important',
    '&:nth-child(1)': {
      marginLeft: '38px ',
      sm: {
        marginLeft: '20px',
      },
    },
    '&:nth-child(2)': {
      margin: '0 40px',
      sm: {
        margin: '0 20px',
      },
    },
    sm: {
      fontSize: '13px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },

  referenceDiv: {
    // backgroundColor: theme.typography.color.white,
    // borderRadius: theme.palette.borderRadius,
    // boxShadow: theme.palette.primary.boxShadow,
  },

  sampleTabBHead: {
    backgroundColor: '#FFFFFF',
    // borderTopLeftRadius: theme.palette.borderRadius,
    // borderTopRightRadius: theme.palette.borderRadius,
  },

  checkBox: {
    '& label': {
      //   color: theme.typography.color.darkGrey,
      '& span ': {
        '&:nth-child(1)': {
          color: '#28c397 !important',
        },
      },
    },
  },

  btns: {
    marginLeft: 'auto',
    sm: {
      marginTop: '12px',
    },
  },

  btnone: {
    // color: theme.typography.color.red,
    // border: `1px solid ${theme.typography.color.darkGrey}`,
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
  },

  btn2: {
    // color: theme.typography.color.white,
    // backgroundColor: theme.typography.color.blue,
    // border: `1px solid ${theme.typography.color.darkGrey}`,
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    marginLeft: '10px',
  },

  notifyTextBox: {
    padding: '0 8px',
  },

  notifyinput: {
    '& div': {
      '& div': {
        '& div': {
          height: '80px !important',
        },
      },
    },
  },

  mailInputParent: {
    '& div': {
      '&:nth-child(1)': {
        sm: {
          paddingRight: '0px',
        },
      },
      md: {
        flexGrow: '1',
      },
      '& div': {
        md: {
          flexGrow: '1',
        },
      },
    },
  },

  mailInput: {
    paddingRight: '16px',
    '&:nth-child(2)': {
      paddingRight: '0px',
    },
    sm: {
      '&:nth-child(1)': {
        paddingLeft: '0px',
      },
    },
  },

  tabparent: {
    height: '100% ',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  tabDivs: {
    height: '100%',
    padding: '24px 32px',
    sm: {
      padding: '16px 20px',
    },
  },

  referenceDiv2: {
    // backgroundColor: theme.typography.color.white,
    // borderRadius: theme.palette.borderRadius,
    // boxShadow: theme.palette.primary.boxShadow,
    height: '100%',
    sm: {
      height: 'auto',
    },
  },

  marginTop: {
    marginTop: '0px',
  },

  headerBox: {
    paddingLeft: '20px',
  },

  commonTable: {
    '& .MuiTableContainer-root': {
      border: '1px solid #efefef',
      borderRadius: '7px 7px 0px 0px',
    },
    '& .MuiTablePagination-root': {
      border: '1px solid #efefef',
      width: '100%',
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
      marginBottom: '12px',
    },
    '& button': {
      textTransform: 'capitalize !important',
      '&:hover': {},
    },
  },

  emailDialog: {
    '& .MuiPaper-root': {
      width: '400px !important',
    },
  },

  leftContent: {
    padding: '24px',
    '& .MuiFormControlLabel-root': {
      marginLeft: '0px !important',
      '& span': {
        fontSize: '12px',
      },
    },
    '& .MuiCheckbox-root': {
      marginRight: '8px',
      border: '1px solid #B3B3B3',
    },
  },

  field: {
    marginBottom: '17px',
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
      fontWeight: 600,
      '& .active': {
        color: '#357968',
      },
    },
  },
};
