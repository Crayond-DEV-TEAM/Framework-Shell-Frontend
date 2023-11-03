import type { SxProps, Theme } from '@mui/material';
import { Box, FormControlLabel, Switch, SwitchProps, styled } from '@mui/material';

import { customSwitchesStyle } from './style';

export interface CustomSwitchesProps {
  className?: string;
  sx?: SxProps<Theme>;
  onChange?: (value: any) => any;
  value: any;
  readOnly?: boolean;
  label?: string;
}
const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : 'primary.main',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.MuiSwitch-switchBase.Mui-checked ': {
      transform: 'translateX(20px)',
    },

    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'primary.main',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    margin: '1px',
  },
  '& .MuiSwitch-track': {
    height: '22px',
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const CustomSwitches = (props: CustomSwitchesProps): JSX.Element => {
  const { className = '', sx = {}, onChange = () => false, label = '', readOnly = false, value, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...customSwitchesStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <FormControlLabel
        control={<CustomSwitch sx={{ ml: 1 }} checked={value} readOnly={readOnly} onChange={onChange} />}
        label={label}
      />
    </Box>
  );
};
