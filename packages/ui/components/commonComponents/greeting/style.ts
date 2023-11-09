import type { SxProps } from '@mui/material';

interface GreetingStyleProps {
  [key: string]: SxProps;
}

export const greetingStyles: GreetingStyleProps = {
  rootSx: {
    //  margin:' 18% auto',
    //   width: '40%',
    height: '100%'
  },
  childrenSx: {},
  subRootSx: {
    display: 'flex',
    height: '100%'
  },
  bannerbox: {
    background: '#FFFFFF',
    width: '430px',
    margin: 'auto',
    padding: '30px',
    textAlign: 'center',
    borderRadius: '8px'
  }
};
