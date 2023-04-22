import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { secretstashTableStyle } from './style';

export interface SecretstashTableProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SecretstashTable = (props: SecretstashTableProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...secretstashTableStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography>SecretstashTable component</Typography>
    </Box>
  );
};
