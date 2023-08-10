import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { badgeDropdownStyle } from './style';

export interface BadgeDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const BadgeDropdown=(props: BadgeDropdownProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...badgeDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>BadgeDropdown component</Typography>
    </Box>
  );
}





