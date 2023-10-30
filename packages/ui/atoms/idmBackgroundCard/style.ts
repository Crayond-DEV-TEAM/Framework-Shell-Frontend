import type { SxProps } from '@mui/material';

interface IdmBackgroundCardStyleProps {
  [key: string]: SxProps;
}

export const idmBackgroundCardStyle: IdmBackgroundCardStyleProps = {
  rootSx: {
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    backgroundColor: 'primary.contrastText',
  },
  header: {
    padding: '24px 20px 14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottom: '1px solid #EAEAEA',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
  },
  content: {
    // padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: '14px',
    fontWeight: 600,
  },
};
