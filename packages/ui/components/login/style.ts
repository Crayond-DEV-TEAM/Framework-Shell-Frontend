import type { SxProps } from '@mui/material';

interface LoginStyleProps {
  [key: string]: SxProps;
}

export const loginStyle: LoginStyleProps = {
  rootSx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContentSx: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 20px #0000000A',
    borderRadius: '12px',
    px: 2.5,
    py: 3,
    width: '100%',
    maxWidth: '435px',
  },

  signInSx: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'typography.text',
  },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
  },
  createPasswordSx: {
    fontSize: '20px',
    color: 'text.primary',
    textAlign: 'left',
    fontWeight: 600,
    py: 1.5,
  },
  inputGroupSx: {
    pt: 1.5,
    display: 'grid',
    gap: 1,
  },
  ForgotSx: {
    fontSize: '14px',
    color: '#353448',
    pt: 2,
    display: 'flex',
    textDecoration: 'underline',
    fontWeight: 600,
    justifyContent: 'end',
    textAlign: 'right',
    cursor: 'pointer',
  },
  loginButtonSx: {
    textTransform: 'capitalize',
    my: 3,
  },
  loginSx: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#5C6266',
  },
  bottomLineSx: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    mx: 1.5,
  },
  alreadySx: {
    color: 'typography.faded',
    fontSize: '14px',
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
    cursor: 'pointer',
    width: '83px',
    pl: 1,
  },
};
