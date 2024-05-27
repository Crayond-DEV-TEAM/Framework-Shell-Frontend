import type { SxProps } from '@mui/material';

interface MappedUserCardStyleProps {
  [key: string]: SxProps;
}

export const mappedUserCardStyle: MappedUserCardStyleProps = {
  rootSx: {},
  main: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    padding: '12px 40px 12px 30px',
    border: '1px solid #EAEAEA',
    width: '250px',
    borderRadius: '8px',
  },
  subProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  designationTxt: {
    pl: 0.2,
    pt: 0.31,
  },
  avatar: {
    backgroundColor: '#EAEAEA',
    height: '40px',
    width: '40px',
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
