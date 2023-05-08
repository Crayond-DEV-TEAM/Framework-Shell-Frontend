import type { SxProps } from '@mui/material';

interface FacilityCloneStyleProps {
  [key: string]: SxProps;
}

export const facilityCloneStyle: FacilityCloneStyleProps = {
  rootSx: {
    backgroundColor: 'primary.contrastText',
    border: '1px solid #EAEAEA',
    borderRadius: '8px',
  },
  header: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  borderLine: {
    border: '1px solid #EAEAEA',
    width: '100%',
  },
  repository: {
    padding: '13px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  repositoryText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#5A5A5A',
  },
  crudText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#5A5A5A',
    margin: '0px 14px',
  },
  footer: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
};
