export const tabs_style = {
  tabBar: {
    '& .css-1gsv261': {
      borderBottom: '0px !important',
    },

    '& .MuiTab-textColorPrimary': {
      fontSize: '13px',
      fontWeight: 600,
      paddingBottom: '6px !important',
      alignItems: 'start !important',
      textTransform: 'capitalize',
      justifyContent: 'end',
    },

    '& .Mui-selected': {
      color: "#357968 !important",
      fontWeight: 600,
    },

    '& .MuiTabs-indicator': {
      display: "none"
      // backgroundColor: "#357968 !important",
      // height: "3px !important"
    },
    '& .MuiTab-root': {
      minWidth: '10px',
      // padding: '14px 8px 12px 4px ',
    },
  },

  alertConfigTab: {
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    paddingBottom: "0px !important",
    "&:nth-child(2)": {
      margin: "0 24px ",
    },
  },

  alertConfigTabTxt: {
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    color: "#357968",
    // color: theme.palette.primary.mailInput,
    borderBottom: "3px solid #357968",
    paddingBottom: "0px !important",
    "&:nth-child(2)": {
      margin: "0 24px",
    },
  },
};
