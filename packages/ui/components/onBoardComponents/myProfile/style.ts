import type { SxProps } from '@mui/material';

interface ProfileStyleProps {
  [key: string]: SxProps;
}

export const ProfileStyle: ProfileStyleProps = {
  Box: {
    width: '400px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    boxShadow: '#0000001F 0px 0px 32px',
    backgroundColor: '#fff',
  },
  head: {
    fontSize: '18px',
    fontFamily: 'Inter,Roboto,-apple-system,sans-serif',
    color: '#29302B',
    fontWeight: '600',
    ml: '12px',
    mt: '2px',
  },
  titleBox: {
    padding: '16px',
    borderBottom: '1px solid #E3E3E3',
    display: 'flex',
  },
  imgBox: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '23px',
  },
  avatar: {
    height: '24px',
    width: '24px',
    opacity: 0,
    position: 'absolute',
    marginBottom: '-65px',
    marginLeft: '83px',
  },
  avatar1: {
    height: '98px',
    width: '105px',
    position: 'absolute',
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
    width: '48%',
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
    p: '16px 24px',
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
    mt: '60px',
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
  upload: {
    width: '100px',
    height: '100px',
    borderRadius: '70px',
    backgroundColor: '#fff',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  uploadbtn: {
    height: '32px',
    mt: 1.5,
  },
  addImageIcon: {
    position: 'absolute',
    marginLeft: '80px',
    marginTop: '65px',
    color: '#357968',
    cusor: 'pointer',
    background: '#fff',
    borderRadius: '18px',
    padding: '4px',
    border: '2px solid #357968',
    height:'30px',
    width:'30px'
  },
  deleteIcon: {
    position: 'absolute',
    color: '#357968',
    ml: '81px',
    mt: '65px',
    background: '#fff',
    borderRadius: '18px',
    padding: '4px',
    border: '2px solid #357968',
    height:'30px',
    width:'30px'
  },
};
