import type { SxProps } from '@mui/material';

interface DeleteDailogStyleProps {
  [key: string]: SxProps;
}

export const delete_DailogStyle: DeleteDailogStyleProps = {
  header: {
    border: '1px solid #E4E8EE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      // backgroundImage: (props) => props?.noService && `url("/images/noservicemob.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPositionY: 'center',
    },
    '& .MuiContainer-root': {
      padding: '0px',
    },
  },
  component: {
    overflow: 'auto',
    height: '450px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  footer: {
    position: 'sticky',
    width: '100%',
    bottom: '0',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'typography.header',
  },
  headAlign: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnBg: {
    backgroundColor: '#EAEAEA',
    borderRadius: '4px',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  savebtnBg: {
    backgroundColor: 'primary.main',
    borderRadius: '4px',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  cancelbtnText: {
    color: '#5A5A5A',
    fontSize: '12px',
    fontWeight: 400,
  },
  savebtnText: {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 400,
  },
  switch: {
    color: '#5A5A5A',
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '12px',
  },
};
