import type { SxProps } from '@mui/material';

interface MapSubscriptionPlanTransferStyleProps {
  [key: string]: SxProps;
}

export const mapSubscriptionPlanTransferStyle: MapSubscriptionPlanTransferStyleProps = {
  rootSx: {},
  labelSx: {
    fontSize: '12px',
    color: '#262C33',
    fontWeight: '500',
  },

  inputGroupSx: {
    display: 'grid',
    pb: 2,
    // mt: '9px',
  },
  inputSx: {
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      fontSize: '14px',
    },
  },
  align: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeft: {
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 600,
    mb: '16px',
  },
  titleRight: {
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 600,
  },
  btmTxt: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 400,
    mb: '16px',
  },
  ticketcontent: {
    backgroundColor: '#F5F5F5',
    mt: '-8px',
    mb: '-2px',
    padding: '9px 23px',
  },
  alignNoSpace: {
    display: 'flex',
    alignItems: 'center',
  },
  borderLine: {
    borderBottom: '1px solid #DBDBDB',
    margin: '12px 0px',
  },
  badge: {
    backgroundColor: '#EAEAEA',
    borderRadius: '6px',
    fontSize: '10px',
    color: '#5A5A5A',
    padding: '4px 8px',
    ml: '8px',
  },
  titleTwoLeft: {
    fontSize: '14px',
    fontWeight: 600,
  },
  dot: {
    backgroundColor: '#AFAFAF',
    padding: '3px',
    borderRadius: '50%',
    margin: '0px 8px',
  },
  btmduplicateTxt: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 400,
  },
  btnFlex: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    top: '100px',
  },
};
