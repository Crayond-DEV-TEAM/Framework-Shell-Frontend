import { Button, SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { backgroundPaperStyle } from './style';

export interface BackgroundPaperProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  subTitle?: string;
  showButton?: boolean;
  onClick?: (value: string) => void;
  content?: any;
}

export const BackgroundPaper = (props: BackgroundPaperProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    subTitle = '',
    showButton = false,
    onClick = () => false,
    content,
    ...rest
  } = props;

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
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography sx={backgroundPaperStyle.title}>{title}</Typography>
          {showButton && (
            <Button
              variant="text"
              onClick={() => onClick(subTitle)}
              sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >{`+ Add ${subTitle ? subTitle : title}`}</Button>
          )}
        </Grid>
        <Box sx={{ mt: '20px' }}>{content}</Box>
      </Box>
    </Box>
  );
};
