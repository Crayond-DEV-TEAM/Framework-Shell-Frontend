import { IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { showValueStyle } from './style';

export interface ShowValueProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleClick?: (e: any, index: number) => void;
  isVisible?: boolean;
}

export const ShowValue = (props: ShowValueProps): JSX.Element => {
  const { className = '', sx = {}, handleClick = () => false, isVisible = false, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...showValueStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
      onClick={handleClick}
    >
      <IconButton sx={showValueStyle.eyeSx}>{isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
    </Box>
  );
};
