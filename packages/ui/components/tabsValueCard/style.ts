import type { SxProps } from '@mui/material';

interface TabsCardStyleProps {
  [key: string]: SxProps;
}

export const tabsCardStyle: TabsCardStyleProps = {
  header: {
    display: 'flex',
    marginTop: '18px',
    marginBottom: '13px',
    padding: '0px 7px',
    '& span': {
      marginRight: '8px',
    },
    '& p': {
      fontSize: '16px',
      fontWeight: 900,
    },
  },

  // smallCard: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     padding: "0px 7px",
  // },

  boxCard: {
    borderRight: '1px solid #E0E0E0',
    padding: '0px 10px',
    '&:nth-child(3)': {
      borderRight: '0px',
    },
    '&:first-child': {
      paddingLeft: '0px',
    },
  },

  sent: {
    padding: '14px 12px',
    paddingBottom: '30px',
    backgroundColor: '#E1E7FA',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
    '& span': {
      fontSize: '24px',
      color: '#1A3DA0',
      fontWeight: 600,
    },
    '& p': {
      position: 'absolute',
      bottom: '12px',
      color: '#29302B',
      fontWeight: 600,
    },
  },

  delivered: {
    padding: '14px 12px',
    paddingBottom: '30px',
    backgroundColor: '#CFFAE5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
    '& span': {
      fontSize: '24px',
      color: '#187547',
      fontWeight: 600,
    },
    '& p': {
      position: 'absolute',
      bottom: '12px',
      color: '#29302B',
      fontWeight: 600,
    },
  },

  notDelivered: {
    padding: '14px 12px',
    paddingBottom: '30px',
    backgroundColor: '#F9FACF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
    '& span': {
      fontSize: '24px',
      color: '#187569',
      fontWeight: 600,
    },
    '& p': {
      position: 'absolute',
      bottom: '12px',
      color: '#29302B',
      fontWeight: 600,
      // whiteSpace: "nowrap",
      // width: "70px",
      // overflow: "hidden",
      // textOverflow: "ellipsis",
      // "&:hover": {
      //   overflow: "visible",
      //   whiteSpace: "normal",
      // }
    },
  },

  clicked: {
    padding: '14px 12px',
    paddingBottom: '30px',
    backgroundColor: '#CFFAF4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
    '& span': {
      fontSize: '24px',
      color: '#187569',
      fontWeight: 600,
    },
    '& p': {
      position: 'absolute',
      bottom: '12px',
      color: '#29302B',
      fontWeight: 600,
    },
  },
};
