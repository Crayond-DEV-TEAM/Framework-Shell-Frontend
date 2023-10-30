import type { SxProps } from '@mui/material';

interface BackgroundPaperStyleProps {
  [key: string]: SxProps;
}

export const backgroundPaperStyle: BackgroundPaperStyleProps = {
  rootSx: {},
  whiteContent: {
    p: 3,
    backgroundColor: 'primary.contrastText',
    mt: '3px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
  },
};
