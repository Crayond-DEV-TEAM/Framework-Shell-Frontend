import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { Button } from '..';
import { toggleButtonStyle } from './style';

export interface ToggleButtonProps {
  className?: string;
  onChange?: (key: any, value: any) => void;
  value?: any;
  options?: any;
  isError?: any;
  errorMessage?: any;
  sx?: SxProps<Theme>;
}

export const ToggleButtons = (props: ToggleButtonProps): JSX.Element => {
  const {
    className = '',
    onChange = () => false,
    value,
    options = [],
    isError = false,
    errorMessage = '',
    ...rest
  } = props;
  const [active, setActive] = useState();
  useEffect(() => {
    if (value !== active) {
      onChange(active, value);
    }
  }, [active, value]);

  useEffect(() => {
    setActive(value);
  }, [value]);
  return (
    <Box>
      <Box display="flex" gap={1} sx={{ my: 0.5 }} className={`${className}`} {...rest}>
        {options?.map((val: any, i: any) => (
          <Box
            key={i}
            sx={{
              display: 'grid',
              placeItems: 'center',
              gap: 0.5,
              ...(val.value === active ? toggleButtonStyle.activeSx : toggleButtonStyle.radioSx),
            }}
            onClick={() => {
              setActive(val.value);
            }}
          >
            <Button sx={val.value === active ? toggleButtonStyle.buttonactiveSx : toggleButtonStyle.buttoninactiveSx}>
              {val?.label && (
                <Typography
                  sx={{
                    fontSize: '12px',
                    ...(val.value === active ? toggleButtonStyle.nameActiveSx : toggleButtonStyle.nameInactiveSx),
                  }}
                >
                  {val.label}
                </Typography>
              )}
              {/* {val?.icon} */}
            </Button>
          </Box>
        ))}
      </Box>
      {isError && (
        <Typography sx={{ mt: 0.5 }} variant="caption" color="error">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
