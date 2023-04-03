import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

import { snacbarCloseStyle } from './style';

export interface SnacbarCloseProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SnacbarClose = (props: SnacbarCloseProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { closeSnackbar } = useSnackbar();

  return (
    <Box
      sx={[
        {
          ...snacbarCloseStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IconButton onClick={(key: any) => closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
