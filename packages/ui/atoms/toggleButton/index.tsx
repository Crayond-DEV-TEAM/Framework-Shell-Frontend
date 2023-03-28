import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { toggleButtonStyle } from './style';
import { createStyles, withStyles } from '@material-ui/core';
// import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { MouseEvent, useState } from 'react';

const BorderLessToggleButton = withStyles(() =>
  createStyles({
    root: {
      border: '1px solid black',

      '&:not(:first-of-type)': {
        borderLeft: 'none',
        borderRadius: '6px',
      },
      '&:not(:last-of-type)': {
        borderRadius: '6px',
      },
      '&MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover': {
        backgroundColor: 'primary.main !important',
        color: 'primary.contrastText',
      },
    },
  }),
)(ToggleButton);

export interface ToggleButtonProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ToggleButtons = (props: ToggleButtonProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [value, setValue] = useState<number>(0);

  const changeValue = (_: MouseEvent, v: number | null) => {
    if (v !== null) setValue(v);
  };

  return (
    <Box
      sx={[
        {
          ...toggleButtonStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box m={1}>
        <ToggleButtonGroup color="primary" size="small" exclusive value={value} onChange={changeValue}>
          <BorderLessToggleButton value={0}>Item 1</BorderLessToggleButton>
          <BorderLessToggleButton value={1}>Item 2</BorderLessToggleButton>
          <BorderLessToggleButton value={2}>Item 3</BorderLessToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};
