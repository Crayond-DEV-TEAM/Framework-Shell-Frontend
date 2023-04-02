import type { SxProps } from '@mui/material';

interface FooterComponentStyleProps {
  [key: string]: SxProps;
}

export const footerComponentStyle: FooterComponentStyleProps = {
  // btnBg: {
  //   backgroundColor: '#EAEAEA',
  //   borderRadius: '4px',
  //   padding: '6px 16px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   cursor: 'pointer',
  // },
  // savebtnBg: {
  //   backgroundColor: 'primary.main',
  //   borderRadius: '4px',
  //   padding: '6px 16px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   cursor: 'pointer',
  // },
  cancelbtnText: {
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
    color: '#FFFFFF',
    fontSize: '12px',
    boxShadow: 'none',
    fontWeight: 400,
  },
  switch: {
    color: '#5A5A5A',
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '12px',
  },
  header: {
    border: '1px solid #E4E8EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
