import type { SxProps } from '@mui/material';

interface MappedUserCardStyleProps {
  [key: string]: SxProps;
}

export const mappedUserCardStyle: MappedUserCardStyleProps = {
  rootSx: {},
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0px',
  },
  subProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#EAEAEA',
    height: '24px',
    width: '24px',
    textTransform: 'capitalize',
    fontSize: '14px',
    marginRight: '15px',
    color: '#5A5A5A',
    fontWeight: 600,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: 600,
    color: '#5A5A5A',
  },
};
