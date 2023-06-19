import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customToggleStyle } from './style';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export interface CustomToggleProps {
  className?: string;
  sx?: SxProps<Theme>;
  tabOne?: string;
  tabTwo?: string;
  handleChange?: (value: any) => void;
}

export const CustomToggle = (props: CustomToggleProps): JSX.Element => {
  const { className = '', sx = {}, tabOne = 'one', tabTwo = 'two', handleChange = () => false, ...rest } = props;
  const [value, setValue] = useState('');

  const handleDevices = (event: React.MouseEvent<HTMLElement>, newDevices: string) => {
    // // if (newDevices.length) {
    setValue(newDevices);
    handleChange(newDevices);
  };

  return (
    <Box
      sx={[
        {
          ...customToggleStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <ToggleButtonGroup sx={customToggleStyle.buttonGrp} aria-label="device" value={value} onChange={handleDevices}>
        <ToggleButton sx={customToggleStyle.btnEft} value={tabOne} aria-label="laptop">
          {tabOne}
        </ToggleButton>
        <ToggleButton sx={customToggleStyle.btnEft} value={tabTwo} aria-label="phone">
          {tabTwo}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
