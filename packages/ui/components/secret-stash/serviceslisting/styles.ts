import type { SxProps } from '@mui/material';

interface ServicesListingStyleProps {
  [key: string]: SxProps;
}

export const servicesListingStyle: ServicesListingStyleProps = {
  rootSx: {
    backgroundColor: 'primary.contrastText',
    // height: '500px',
    borderRadius: '8px',
    border: '1px solid #EAEAEA',
    // height: '100vh',
    width: '230px',
    height: 'calc(100vh - 100px)',
  },
  infiniteScroll: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    pt: 2,
    pb: 1.25,
    borderBottom: '1px solid #EAEAEA',
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
    width: '500px',
    height: '450px',
  },
  inputSx: {
    fontWeight: '600',
  },
  noDataSx: {
    fontWeight: '600',
    width: '100%',
    margin: '0px auto',
    p: 2,
    fontSize: ' 14px',
    textAlign: 'center',
  },
  sericesCard: {
    backgroundColor: '#EAF1EF',
    color: '#EAF1EF',
    pb: 1.25,
  },
};
