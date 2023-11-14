import type { SxProps } from '@mui/material';

interface ProfileStyleProps {
  [key: string]: SxProps;
}

export const ProfileStyle: ProfileStyleProps = {
  Box: {
    width: '400px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px 1px rgba(0,0,0,0.41)',
    backgroundColor: '#fff',
  },
  head: {
    fontSize: '18px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    color: '#29302B',
    fontWeight: '600',
    ml: '12px',
  },
  titleBox: {
    padding: '16px',
    borderBottom: '1px solid #E3E3E3',
    display: 'flex',
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '23px',
  },
  avatar: {
    height: '116px',
    width: '116px',
  },
  name: {
    mt: '22px',
    fontSize: '24px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    fontWeight: '700',
  },
  title: {
    fontSize: '12px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    color: '#262C33',
  },
  subtitle: {
    fontSize: '14px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    fontWeight: '600',
    color: '#0F0B11',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'space-between',
    p: 2,
  },
  btn: {
    height: '32px',
    fontSize: '12px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    textTransform: 'capitalize',
    width: '45%',
  },
  dialogSx: {
    width: '400px',
    // height: '440px',
    borderRadius: '8px',
  },
  dialogPassword: {
    width: '425px',
    // height: '325px',
    borderRadius: '12px',
  },
  padd: {
    p: '12px 24px',
  },
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
    pb: 1,
  },

  inputGroupSx: {
    display: 'grid',
    // pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  mainBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '100px',
  },
  passwordBox: {
    p: 2.5,
  },
  inputGroupConform: {
    mt: 1,
  },
  reset: {
    fontSize: '14px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    color: '#5C6266',
    mb: 2,
  },
  ConfirmBtn: {
    width: '100%',
    mt: 2.5,
    textTransform: 'capitalize',
    borderRadius: '4px',
  },
  inputpassword: {
    mt: '9px',
  },
  eyeSx: {
    width: '20px',
    height: '20px',
  },
};
