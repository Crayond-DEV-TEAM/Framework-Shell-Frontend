import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { backgroundPaperStyle } from './style';

export interface BackgroundPaperProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  content?: any;
}

export const BackgroundPaper = (props: BackgroundPaperProps): JSX.Element => {
  const { className = '', sx = {}, title = '', content, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...backgroundPaperStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={backgroundPaperStyle.whiteContent}>
        <Typography sx={backgroundPaperStyle.title}>{title}</Typography>
        <Box sx={{ mt: '20px' }}>{content}</Box>
      </Box>
    </Box>
  );
};
