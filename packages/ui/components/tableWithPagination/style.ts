export const tableWithPagination_style = {
  tableContainer: {
    boxShadow: '0 20px 25px #D9D9D97A',
    borderRadius: '8px',
  },
  tbody: (props: any) => ({
    height: '52px',
    cursor: 'pointer',
    '&.Mui-selected': {
      backgroundColor: '#F1F7FF',
    },
    '&:hover': {
      backgroundColor: '#F1F7FF',
    },
    backgroundColor: props?.cellBackground ? props?.cellBackground : props.tableType === 'normal' ? '#F2F4F7' : 'white',
    '& th': {
      borderBlock: props.tableType === 'normal' ? 0 : '0.5px solid #E4E8EE',
    },
    '& th:first-child': {
      borderRadius: props.tableType === 'normal' ? '4px 0px 0px 4px' : 0,
      borderLeft: props.tableType === 'normal' ? 0 : props?.tableType === 'no-side' ? 0 : '1px solid #E4E8EE',
    },
    '& th:last-child': {
      borderRadius: props.tableType === 'normal' ? '0 4px 4px 0' : 0,
      borderRight: props.tableType === 'normal' ? 0 : props?.tableType === 'no-side' ? 0 : '0.5px solid #E4E8EE',
    },
  }),
  assignstatus: {},
  completeStatus: {},
  tableBodyText: {
    '& tr': {
      '& th': {
        borderBottom: '0 !important',
        padding: '20px !important',
        '& p': {
          fontSize: '14px !important',
          //   color: theme.typography.color.darkGrey,
          sm: {
            fontSize: '12px !important',
          },
        },
      },
    },
    '& td': {
      padding: '20px !important',
      '& p': {
        fontSize: '14px !important',
        // color: `${theme.typography.color.darkGrey} !important`,
      },
    },
  },

  arrow: {
    border: '1px solid #E4E8EE',
    backgroundColor: 'white',
    fontSize: '16px',
    color: 'black',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  paginate: {
    '& .MuiButtonBase-root.MuiPaginationItem-root': {
      //   borderRadius: theme.palette.borderRadius,
      border: 'none',
      color: '#606060',
    },
    '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
      color: 'white',
      //   borderRadius: theme.palette.borderRadius,
      border: 'none',
      backgroundColor: '#5078E1',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '20px',
    sm: {
      display: 'block',
    },
  },
  typo: {
    fontSize: '14px',
    color: '#4E5A6B',
    fontWeight: 'bold',
    margin: 0,
    overflow: 'hidden',
  },
  tabletopbtn: {
    fontWeight: 'lighter',
    boxShadow: 'none',
    marginLeft: '6px',
    backgroundColor: '#F8F8F8',
    border: '1px solid #E9E9E9',
    borderRadius: '6px',
    color: 'black',

    '&:nth-child(1)': {
      textTransform: 'capitalize',
    },
    '&:hover': {
      backgroundColor: '#F8F8F8',
      border: '1px solid #E9E9E9',
      borderRadius: '6px',
      boxShadow: 'none',
    },
  },
  root: {
    whiteSpace: 'noWrap',
    '& .MuiTableContainer-root': {
      marginTop: (props: any) => props?.marginTop,
      '&::-webkit-scrollbar': {
        height: 6,
      },
      '& table': {
        borderCollapse: 'separate',
      },
    },
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  change: {
    textDecoration: 'underline',
    color: '#4D7EFF',
    cursor: 'pointer',
    marginLeft: 70,
  },
  thead: {
    '& th': {
      fontSize: '16px !important',
      color: '#10061D !important',
      fontFamily: 'crayond_medium',
      //   backgroundColor: theme.typography.color.tableHead + "!important",
      padding: '16px 24px !important',
      zIndex: '0 !important',
      whiteSpace: 'nowrap',
      sm: {
        fontSize: '13px !important',
      },
    },
    backgroundColor: '#F2F4F7',
    '& th:first-child': {
      borderRadius: (props: any) => (props.tableType === 'normal' ? '4px 0px 0px 4px' : '4px 0 0 0'),
    },
    '& th:last-child': {
      borderRadius: (props: any) => (props.tableType === 'normal' ? '0 4px 4px 0' : '0 4px 0 0'),
    },
  },
  select: {
    color: 'red',
    '& .MuiSelect-select': {
      paddingBlock: 0,
      fontSize: '14px',
      color: '#4E5A6B',
      fontWeight: 'bold',
      height: 20,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
  noRecordDiv: {
    textAlign: 'center',
    marginTop: 30,
  },
  menu: {
    '& .MuiPopover-paper': {
      boxShadow: '0 0px 8px -4px #f2f3f5',
      border: '1px solid #f2f3f5',
      borderRadius: '5px',
    },
  },
  active: {
    fontSize: '14px',
    color: '#5AC782',
  },
  inprogress: {
    padding: '4px 6px',
    backgroundColor: '#78B1FE',
    // borderRadius: theme.palette.borderRadius,
    display: 'inline',
    color: 'white',
    fontSize: '10px',
  },

  activego: {
    padding: '4px 6px',
    backgroundColor: '#5AC782',
    // borderRadius: theme.palette.borderRadius,
    display: 'inline',
    color: 'white',
    fontSize: '10px',
  },
  inactivego: {
    padding: '4px 6px',
    backgroundColor: '#CED3DD',
    // borderRadius: theme.palette.borderRadius,
    display: 'inline',
    color: 'white',
    fontSize: '10px',
  },
  inactive: {
    fontSize: '14px',
    color: 'red',
  },
  more: {
    fontSize: '20px',
    color: 'gray',
    cursor: 'pointer',
  },
  menuList: {
    '& .MuiPopover-paper': {
      boxShadow: '0px 0px 6px #0717411F',
      //   borderRadius: theme.palette.borderRadius,
      backgroundColor: 'white',
    },
  },
  menuItem: {
    borderBottom: '1px solid #E4E8EE',
    margin: '0px 4px',
    fontSize: '14px',
    color: '#071741',
    '&:last-child': {
      border: 0,
    },
  },
  text: {
    whiteSpace: 'nowrap',
    fontSize: '14px',
    '& .ql-editor': {
      // padding: "0px 0px 16px 0px",
      //   color: theme.typography.color.primary,
      fontSize: '14px',
      textTransform: 'capitalize',
      wordBreak: 'break-all',
      overflowWrap: 'anywhere',
    },
  },
  tooltip: {
    '&:hover': {
      //   backgroundColor: theme.typography.color.white,
    },
  },
  qstatus: {
    fontSize: '14px',
    textTransform: 'capitalize',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '4px',
    color: 'white',
  },
  infoIcon: {
    color: '#4E5A6B',
    fontSize: '20px',
  },
  yet: {
    fontSize: '14px',
    color: '#FF9340',
    textTransform: 'capitalize',
  },
  link: {
    textDecoration: 'underline',
    color: '#5078E1',
    fontSize: '14px',
  },
  moreBtn: {
    float: 'right',
  },
  red: {
    color: 'white',
    backgroundColor: 'red',
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '4px',
  },
  lightBlue: {
    color: 'white',
    backgroundColor: '#78B1FE',
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '4px',
  },
  green: {
    color: 'white',
    backgroundColor: '#5AC782',
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '4px',
  },
  yellow: {
    color: 'white',
    backgroundColor: '#FAD500',
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '4px',
  },

  iconText: {
    display: 'flex',
  },

  iconLock: {
    marginRight: '8px',
  },

  paginateNum: {
    '& .MuiButtonBase-root.MuiPaginationItem-root': {
      borderRadius: '50% !important',
      border: 'none',
      color: '#606060',
    },
    '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
      color: 'white',
      borderRadius: '50% !important',
      border: 'none',
      backgroundColor: '#464775',
    },
  },

  totalTable: {
    whiteSpace: 'normal !important',
  },

  autoText: {
    '& p': {
      padding: '5px 14px',
      fontSize: '12px',
      //   color: `${theme.typography.color.white} !important`,
      backgroundColor: '#464775',
      borderRadius: '13px',
      textAlign: 'center',
    },
  },

  editIcon: {
    cursor: 'pointer',
  },

  copyIcon: {
    cursor: 'pointer',
  },
};
