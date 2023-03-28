import type { SxProps } from '@mui/material';

interface LanguageConfigStyleProps {
  [key: string]: SxProps;
}

export const languageConfigStyle: LanguageConfigStyleProps = {
  rootSx: {},
  sx: {
    width: '100%',
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
    //width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    position: 'absolute',
    left: '170px',
  },
  messagetxt: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#FF4D4A',
  },
};
