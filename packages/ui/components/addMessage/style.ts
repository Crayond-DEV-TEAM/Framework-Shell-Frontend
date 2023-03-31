import type { SxProps } from '@mui/material';

interface AddMessageStyleProps {
  [key: string]: SxProps;
}

export const addMessageStyle: AddMessageStyleProps = {
  rootSx: {
    // border: '1px solid #EAEAEA',
    backgroundColor: 'primary.contrastText',
    height: '661px',
    borderRadius: '8px',
  },
  header: {
    borderBottom: '1px solid #EAEAEA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2.5,
    py: 2,
  },
  body: {
    padding: '12px',
  },
  titleSx: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#29302B',
  },
  dialogSx: {
    width: '461px',
    height: '414px',
  },
};
