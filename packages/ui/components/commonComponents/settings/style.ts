import type { SxProps } from '@mui/material';

interface SettingsStyleProps {
  [key: string]: SxProps;
}

export const settingsStyle: SettingsStyleProps = {
  copySx: {
    backgroundColor: '#E9F0EF',
    borderRadius: '0px',
  },
  inputSx: {
    '& .MuiOutlinedInput-root': {
      pl: 0.7,
    },
  },
  rootSx: {
    px: 3,
  },
  subHeader: {
    fontSize: '16px',
  },
  labelSx: {
    fontSize: '12px',
    color: 'typography.label',
    lineHeight: '2.4200em',
    fontWeight: '600'
  },
  firstInput: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 20px #0000000A',
    padding: '0px 16px',
    pt: '7px',
    pb: '16px',
    sm: {
      padding: '16px 24px',
    },
    border: '1px solid #eaeaea',
  },
};
