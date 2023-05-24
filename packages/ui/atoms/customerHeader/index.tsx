import { IconButton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerHeaderStyle } from './style';
import { BackButton } from '@atoms/icons';
import { Button } from '..';

export interface CustomerHeaderProps {
  className?: string;
  sx?: SxProps<Theme>;
  isback?: boolean;
  title?: string;
}

export const CustomerHeader = (props: CustomerHeaderProps): JSX.Element => {
  const { className = '', sx = {}, isback = true, title = 'title', ...rest } = props;

  return (
    <Box>
      <Box sx={customerHeaderStyle.rootSx}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isback && (
            <IconButton>
              <Box sx={customerHeaderStyle.imageBorder}>
                <BackButton />
              </Box>
            </IconButton>
          )}

          <Typography sx={{ ml: 1, fontWeight: 600 }}>{title}</Typography>
        </Box>

        <Box sx={customerHeaderStyle.btn}>
          <Button sx={{ width: '72px', height: '28px', textTransform: 'capitalize' }}>Save</Button>
          <Button sx={{ width: '72px', height: '28px', textTransform: 'capitalize', ml: 1 }} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
