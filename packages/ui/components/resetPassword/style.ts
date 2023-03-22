import type { SxProps } from '@mui/material';

interface ResetPasswordStyleProps {
  [key: string]: SxProps;
}

export const resetPasswordStyle: ResetPasswordStyleProps = {
  rootSx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContentSx: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 69px #0000001A',
    borderRadius: '12px',
    px: 2.5,
    py: 3,
    width: '100%',
    maxWidth: '435px',
  },
  eyeSx: {
    width: '16px',
    height: '16px',
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
    color: 'typography.text',
    pt: 2,
    display: 'flex',
    textDecoration: 'underline',
    justifyContent: 'end',
  },
  loginButtonSx: {
    textTransform: 'capitalize',
    my: 3,
  },

  bottomLineSx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mx: 4.5,
  },
  alreadySx: {
    color: 'typography.faded',
    fontSize: '14px',
  },
  signup: {
    color: 'typography.text',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'underline',
    pl: 1,
  },
  provideSx: {
    color: 'typography.faded',
    fontSize: '14px',
    pt: 1.5,
  },
};
