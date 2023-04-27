import type { SxProps } from '@mui/material';

interface ConfigureRepoStyleProps {
  [key: string]: SxProps;
}

export const configureRepoStyle: ConfigureRepoStyleProps = {
  rootSx: { padding: '16px' },
  titlebar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  json: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#262C33',
  },
  download: {
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: 600,
    color: 'primary.main',
    cursor: 'pointer',
  },
};
