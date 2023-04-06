import type { SxProps } from '@mui/material';

interface LanguageConfigStyleProps {
  [key: string]: SxProps;
}

export const languageConfigStyle: LanguageConfigStyleProps = {
  rootSx: {},
  sx: {
    width: '100%',
    maxWidth: '761px',
    height: '364px',
    backgroundColor: 'primary.contrastText',
    border: '1px solid #EAEAEA',
    borderRadius: '8px',
  },
  header: {
    p: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #EAEAEA',
  },
  selectLang: {
    fontSize: '16px',
    fontWeight: 600,
  },
  topText: {
    fontSize: '20px',
    fontWeight: 600,
    pl: 1,
  },
  default: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#0F0B11',
  },
  content: {
    pl: 3,
    pt: 2,
  },
  messageBox: {
    backgroundColor: '#fadede',
    px: '8px',
    py: '4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    margin: '0px auto',
    fontSize: '12px',
    fontWeight: 500,
    color: '#FF4D4A',
  },
  messageSuccess: {
    backgroundColor: '#c9f4cb',
    px: '8px',
    py: '4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    margin: '0px auto',
    fontSize: '12px',
    fontWeight: 500,
    color: 'primary.main',
  },
  // messagetxt: {
  //   fontSize: '12px',
  //   fontWeight: 500,
  //   color: '#FF4D4A',
  // },
  searchBoxSx: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    mb: 2,
    color: '#29302B',
  },
  innerSearchSx: {
    '&.MuiInputBase-input-MuiOutlinedInput-input': {
      color: '#29302B!important',
      fontSize: '16px',
      fontWeight: '600',
    },
    '& .MuiOutlinedInput-root': {
      p: '20px',
      color: '#29302B!important',
      fontSize: '16px',
      fontWeight: '600',
      '& ::placeholder': {
        opacity: 1,
      },
    },
  },
  cancelbtnText: {
    textTransform: 'capitalize',
    backgroundColor: '#EAEAEA',
    color: '#5A5A5A',
    fontSize: '12px',
    fontWeight: 400,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#EAEAEA',
      boxShadow: 'none',
    },
  },
  savebtnText: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: '12px',
    boxShadow: 'none',
    fontWeight: 400,
    width: '64px',
    ml: 1,
    mr: 2,
  },
  totalFooterSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    paddingTop: '16px',
  },
  btnSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
