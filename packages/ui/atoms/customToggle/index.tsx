import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { customToggleStyle } from './style';

export interface CustomToggleProps {
  className?: string;
  sx?: SxProps<Theme>;
  value?: any[];
  tabOne?: string;
  tabTwo?: string;
  handleChange?: (value: any) => void;
}

export const CustomToggle = (props: CustomToggleProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    value = [],
    tabOne = 'one',
    tabTwo = 'two',
    handleChange = () => false,
    ...rest
  } = props;
  const [toggle_value, setToggleValue] = useState<any>([]);

  useEffect(() => {
    setToggleValue(value);
  }, []);

  const handleDevices = (event: React.MouseEvent<HTMLElement>, newDevices: string) => {
    setToggleValue(newDevices);
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
      <ToggleButtonGroup
        sx={customToggleStyle.buttonGrp}
        aria-label="device"
        value={toggle_value}
        onChange={handleDevices}
      >
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
