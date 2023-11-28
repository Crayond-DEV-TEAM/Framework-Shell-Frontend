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
    px: 2,
  },
  cardContentSx: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 20px #0000000A',
    borderRadius: '12px',
    px: 2.75,
    py: 3,
    width: '100%',
    maxWidth: '435px',
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
    color: 'primary.main',
    textDecoration:'underline',
    fontWeight:600,
  },
  eyeSx: {
    width: '16px',
    height: '16px',
  },
  signup: {
    color: 'typography.text',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'underline',
    pl: 1,
    cursor: 'pointer',
  },
};
