import type { SxProps } from '@mui/material';

interface SignUpStyleProps {
  [key: string]: SxProps;
}

export const signUpStyle: SignUpStyleProps = {
  rootSx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContentSx: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 69px #0000001A',
    borderRadius: '12px',
    px: 2.75,
    py: 3,
    width: '435px',
  },
  createPasswordSx: {
    fontSize: '20px',
    color: '#353448',
    textAlign: 'left',
    fontWeight: 600,
    pb: 1.5,
  },
  inputGroupSx: {
    pt: 1.5,
    display: 'grid',
    gap: 1,
  },
  loginButtonSx: {
    textTransform: 'capitalize',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
  },
  loginSx: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#5C6266',
    pt: 3,
  },
  eyeSx: {
    width: '20px',
    height: '20px',
  },
};
