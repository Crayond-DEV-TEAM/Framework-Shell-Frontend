export const apiDocumentation_style = {
  root: {
    px: 3,
    // [theme.breakpoints.up("lg")]: {
    //   padding: "6% 0 1% 0 ",
    // },
    // [theme.breakpoints.down("lg")]: {
    //   padding: "8% 0 1% 0 ",
    // },
    // [theme.breakpoints.down("md")]: {
    //   padding: "9% 0 1% 0 ",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   padding: "18% 0 1% 0 !important",
    // },
  },

  firstInput: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 20px #0000000A',
    padding: '0px 16px',
    pt: '7px',
    pb: '16px',
    sm: {
      padding: '16px 24px',
    },
    border: '1px solid #eaeaea',
  },
  copySx: {
    backgroundColor: '#E9F0EF',
    borderRadius: '0px',
  },

  textBox: {
    padding: '8px 0',
  },

  textFieldhead: {
    color: '#262C33',
    fontSize: '14px',
    fontWeight: 600,
    padding: ' 0px 16px 0px 16px',
  },
  headText: {
    color: '#262C33',
    fontSize: '14px',
    fontWeight: 600,
    padding: ' 0px 16px 0px 8px',
  },
  gridBox: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 5px 20px #0000000A',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #eaeaea',
  },

  referenceScroll: {
    height: '600px',
    overflow: 'scroll',
    padding: '16px',
    lg: {
      height: '700px',
    },
    md: {
      height: '800px',
    },
    sm: {
      height: 'auto',
      padding: '12px',
    },
  },

  reqHead: {
    color: '#10061D',
    fontSize: '16px',
    // fontFamily: 'crayond_medium',
    padding: ' 16px 16px 0px 16px',
    sm: {
      fontSize: '14px',
      paddingBottom: '6px',
    },
  },

  tryBtn: {
    fontSize: '14px',
    backgroundColor: '#357968',
    borderRadius: '8px',
    width: '43px',
    height: '32px',
    padding: '8px 12px',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: '22px',
    cursor: 'pointer',
  },

  sampleTabBHead: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    marginTop: '16px',
  },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
    lineHeight: '2.4200em',
  },

  sampleTabTxt: {
    cursor: 'pointer',
    fontSize: '16px',
    // fontFamily: 'crayond_medium',
    marginLeft: '22px',
    paddingTop: '16px',
    paddingBottom: '5px',
    fontWeight: 600,
    sm: {
      fontSize: '13px',
      marginLeft: '20px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },

  sampleTabClickTxt: {
    cursor: 'pointer',
    fontSize: '16px',
    // fontFamily: 'crayond_medium',
    color: '#357968',
    marginLeft: '22px',
    paddingTop: '16px',
    paddingBottom: '5px',
    borderBottom: '3px solid #357968',
    fontWeight: 600,
    sm: {
      fontSize: '13px',
      marginLeft: '20px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },

  dummy: {
    fontSize: '14px',
    height: '100%',
    whiteSpace: 'break-spaces',
    backgroundColor: '#F7F7F7',
    padding: '13px 14px',
    borderRadius: '8px',
    sm: {
      fontSize: '13px',
    },
  },
  btnSx: {
    borderRadius: '8px',
    textTransform: ' capitalize',
    width: ' 44px',
    backgroundColor: '#357968',
    textAlign: 'center',
    color: ' #fff',
    padding: '3px 3px',
  },
  trySx: {
    display: 'flex',
    justifyContent: 'end',
    p: 2,
    cursor: 'pointer',
  },
  apicontent: {
    display: 'block',
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
    p: 2,
    pb: 9,
    borderRadius: '8px',
    fontSize: '14px',
    sm: {
      fontSize: '13px',
    },
  },

  referenceParent: {
    flexWrap: 'nowrap',
    sm: {
      flexWrap: 'wrap',
    },
  },

  referenceParent1: {
    sm: {
      width: '100%',
    },
  },
  subHeader: {
    fontSize: '16px',
  },
  lastSx: {
    backgroundColor: '#fff',
    boxShadow: '0 5px 20px #0000000A',
    borderRadius: '8px',
    marginTop: '16px',
    border: '1px solid #eaeaea',
  },
  inputSx: {
    '& .MuiOutlinedInput-root': {
      pl: 0.7,
    },
  },
  commonTable: {
    // border: "1px solid #EAEAEA",
    '& .MuiPaper-root': {
      borderRadius: '7px',
    },
    '& .MuiTablePagination': {
      display: 'none',
    },
    '& .MuiTableContainer-root': {
      borderBottom: '1px solid #EAEAEA',
      borderRadius: '7px',
    },
    '& .TABLE_BOX': {
      padding: '0px !important',
      gap: '0px !important',
    },
  },
  contentSx: {},
  errorSx: {
    backgroundColor: '#ffe8e8',
    borderRadius: '50px',
    p: 2,
    width: '96px',
    display: 'flex',
    margin: '0px auto',
    justifyContent: 'center',
    height: '96px',
    alignItems: 'center',
  },
  totalError: {
    textAlign: 'center',
    // px: 3,
    pt: 3,
    // pb: 3,
  },
  responseSx: {
    fontSize: '16px',
    fontWeight: '600',
    p: 2,
  },
  bodySx: {
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
    p: 2,
    mb: 3,
    borderRadius: '8px',
  },
  ResponseBtn: {
    maxWidth: '242px',
    borderRadius: '8px',
  },
};
