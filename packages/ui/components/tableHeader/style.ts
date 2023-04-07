import type { SxProps } from '@mui/material';

interface TableHeaderStyleProps {
  [key: string]: SxProps;
}

export const tableHeaderStyle: TableHeaderStyleProps = {
  rootSx: {},
  titleSx: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#29302B',
    textTransform: 'capitalize',
  },
  totalHeaderSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // p: 2,
    // px: 0,
  },
  leftSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSx: {
    borderRadius: '8px',
    textTransform: 'capitalize',
  },
  dialogSx: {
    width: '1020px',
    // height: '520px',
  },
  contentSx: {
    '&.MuiDialogContent-root': {
      paddingBottom: '0px',
    },
  },
  downloadIcon: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "4px 8px",
    marginLeft: "8px",
    cursor: "pointer"
},
download: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "14px",
    cursor: "pointer",
    "& p": {
        fontSize: "12px",
        marginLeft: "10px",
    },
    "&:nth-child(2)": {
        paddingBottom: "0px",
    }
},
downloadBox: {
    padding: "14px"
}
};
