import type { SxProps } from '@mui/material';

interface SchemaMapperProps {
  [key: string]: SxProps;
}

export const schemaStyle: SchemaMapperProps = {
  root: {
    textAlign: 'left',
    margin: '10px 11px 10px',
    // backgroundColor: "#FFFFFF",
    padding: '15px',
    borderRadius: '15px',
  },
  rootsection: {
    textAlign: 'left',
    margin: '0px 11px 10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',
    border: `0.2px solid #8484843D`,
    boxShadow: '0px 8px 69px #0000001A',
    // borderColor: theme.palette.common.grey,
    position: 'relative',
    '& .MuiList-root': {
      // maxHeight: "300px",
      height: '320px',
      overflow: 'auto',
      paddingTop: '10px',
    },
  },
  destinationrootsection: {
    textAlign: 'left',
    margin: '0px 11px 10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',
    border: `0.2px solid #8484843D`,
    boxShadow: '0px 8px 69px #0000001A',
    // borderColor: theme.palette.common.grey,
    position: 'relative',
    '& .MuiList-root': {
      // maxHeight: "300px",
      height: '285px',
      overflow: 'auto',
      paddingTop: '10px',
    },
  },
  tittle: {
    fontWeight: 600,
    fontSize: '20px',
    position: 'sticky',
  },
  tittlesection: {
    fontWeight: 600,
    // fontSize: "20px",
    position: 'sticky',
    padding: '13px 15px',
    borderBottom: '1px solid',
    borderBottomColor: '#EFEFEF',
  },
  mapbtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 28px 10px',
  },
  menulist: {
    padding: '3px 48px 3px 16px',
  },
  listView: {
    padding: '4px 48px 4px 16px',
    backgroundColor: '#8863FB1F',
    color: '#8863FB',
    borderRadius: '14px',
    '& .MuiTypography-root': {
      // fontWeight: 600,
    },
    '&:hover': {
      backgroundColor: '#8863FB1F',
      color: '#8863FB',
      borderRadius: '14px',
      '& .MuiTypography-root': {
        // fontWeight: 600,
      },
    },
  },
  list: {
    padding: '10px 15px 15px',
  },
  main: {
    width: '100%',
    maxWidth: '90%',
    margin: '0 auto 50px',

    // maxHeight: '100vh'
    // backgroundColor: theme.palette.common.grey,
  },
  search: {
    borderWidth: 0,
    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
      backgroundColor: '#2B31450D',
    },
  },
  cancelButton: {
    color: '#DE57E5',
    backgroundColor: '#FFFFFF',
    borderColor: '#84848466 !important',
    '& :hover': {
      color: '#DE57E5',
      borderColor: '#84848466 !important',
    },
  },
  footer: {
    borderTop: '1px solid #eeeeee',
    bottom: 96,
    right: 0,
    display: 'flex',

    justifyContent: 'flex-end',

    overflow: 'hidden',
    padding: 1,
    background: '#fff',
    // position: "absolute",
    width: '96%',
    left: '24px',
    borderRadius: 6,
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 20px 14px 20px',
    // align-items: center;
    justifyContent: 'left',
    paddingLeft: 10,
    // borderBottom: "1px solid #ced3dd",
    '& .MuiTypography-subtitle2': {
      fontWeight: 600,
      fontSize: 16,
    },
    '& svg': {
      cursor: 'pointer',
    },
    height: 46,
    maxHeight: 46,
    marginBottom: 16,
    '& .icon': {
      background: '#ffffff',
      boxShadow: '#d9d9d97a 0px 20px 25px',
      borderRadius: 50,
      padding: 4,
      width: '30px',
      height: '30px',
      marginRight: 8,
    },
  },
};
