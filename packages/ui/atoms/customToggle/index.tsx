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
}

export const CustomToggle = (props: CustomToggleProps): JSX.Element => {
  const { className = '', sx = {}, tabOne = 'one', tabTwo = 'two', ...rest } = props;
  const [value, setValue] = useState(0);

  const handleDevices = (event: React.MouseEvent<HTMLElement>, newDevices: number) => {
    // if (newDevices.length) {
    setValue(newDevices);
    // }
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
        <ToggleButton sx={customToggleStyle.btnEft} value="2" aria-label="laptop">
          {tabOne}
        </ToggleButton>
        <ToggleButton sx={customToggleStyle.btnEft} value="1" aria-label="phone">
          {tabTwo}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
