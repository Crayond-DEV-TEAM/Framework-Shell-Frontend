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
    fontSize: '12px',
    fontWeight: 500,
    color: 'primary.main',
    cursor: 'pointer',
  },
  errorTxt: {
    fontSize: '14px',
    color: '#f00',
    textAlign: 'end',
    pr: 1,
  },
  rightActionSx: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  importTxtSx: {
    fontSize: '14px',
    '&.MuiButton-root': {
      padding: ' 0 15px',
      cursor: 'pointer',
    },
  },
  iconSx: {
    fontSize: '16px',
  },
  importLabelSx: { fontSize: '14px', textTransform: 'capitalize', cursor: 'pointer' },
  toggleButtonSx: {
    '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      borderLeft: '1px solid #BCD3CD',
    },
    '& .MuiToggleButton-root': {
      padding: '3px 12px',
      textTransform: 'capitalize',
      border: '1px solid #BCD3CD',

      '&.Mui-selected': {
        backgroundColor: '#BCD3CD',
        color: '#357968',
        '&:hover': {
          backgroundColor: '#BCD3CD',
        },
      },
    },
  },
};

// 357968
