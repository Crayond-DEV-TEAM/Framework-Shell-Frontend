import type { SxProps } from '@mui/material';

interface GreetingStyleProps {
  [key: string]: SxProps;
}

export const greetingStyles: GreetingStyleProps = {
  rootSx: {
   margin:' 18% auto',
    width: '40%',
  },
  childrenSx: {},
};
