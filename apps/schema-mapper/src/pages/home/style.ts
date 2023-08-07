import type { SxProps } from '@mui/material';

interface HomeStyleProps {
  [key: string]: SxProps;
}

export const homeStyle: HomeStyleProps = {
  rootSx: {
    display: 'grid',
    placeItems: 'center',
    mx: 'auto',
    m: 4,
    minHeight: '70vh',
    bgcolor: 'white',
    p: 4,
    borderRadius: 4,
  },
};
