import type { SxProps } from '@mui/material';

interface TabsCardStyleProps {
  [key: string]: SxProps;
}

export const tabsCardStyle: TabsCardStyleProps = {
  header: {
    display: 'flex',
    mt: '5px',
    mb: '5px',
    '& span': {
      marginRight: '8px',
      display: 'flex',
    },
    '& p': {
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
    },
  },

  boxCard: {
    borderRight: '1px solid #E0E0E0',
    padding: '0px 10px',
    '&:nth-child(3)': {
      borderRight: '0px',
    },
    '&:nth-child(6)': {
      borderRight: '0px',
    },
    '&:first-child': {
      paddingLeft: '0px',
    },
    '&:nth-child(4)': {
      paddingLeft: '0px',
    },
  },

  sent: {
    padding: '14px 12px',
    backgroundColor: '#E1E7FA',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    '& span': {
      fontSize: '24px',
      color: '#1A3DA0',
      fontWeight: 600,
    },
    '& p': {
      fontSize: '11px',
      color: '#29302B',
      fontWeight: 600,
    },
  },

  delivered: {
    padding: '14px 12px',
    backgroundColor: '#CFFAE5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    '& span': {
      fontSize: '24px',
      color: '#187547',
      fontWeight: 600,
    },
    '& p': {
      fontSize: '11px',
      color: '#29302B',
      fontWeight: 600,
    },
  },

  notDelivered: {
    padding: '14px 12px',
    backgroundColor: '#F9FACF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    '& span': {
      fontSize: '24px',
      color: '#187569',
      fontWeight: 600,
    },
    '& p': {
      fontSize: '11px',
      color: '#29302B',
      fontWeight: 600,
    },
  },

  clicked: {
    padding: '14px 12px',
    backgroundColor: '#CFFAF4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    '& span': {
      fontSize: '24px',
      color: '#187569',
      fontWeight: 600,
    },
    '& p': {
      fontSize: '11px',
      color: '#29302B',
      fontWeight: 600,
    },
  },
};
