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
  btns?: boolean;
  onSave?: any;
  onCancel?: any;
  onBack?: any;
}

export const CustomerHeader = (props: CustomerHeaderProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    isback = true,
    title = 'title',
    btns = true,
    onSave,
    onCancel,
    onBack,
    ...rest
  } = props;
  return (
    <Box>
      <Box sx={customerHeaderStyle.rootSx}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isback && (
            <IconButton onClick={onBack}>
              <Box sx={customerHeaderStyle.imageBorder}>
                <BackButton />
              </Box>
            </IconButton>
          )}

          <Typography sx={{ ml: 1, fontWeight: 600 }}>{title}</Typography>
        </Box>
        {btns && (
          <Box sx={customerHeaderStyle.btn}>
            <Button sx={{ width: '72px', height: '28px', textTransform: 'capitalize' }} onClick={onSave}>
              Save
            </Button>
            <Button
              sx={{ width: '72px', height: '28px', textTransform: 'capitalize', ml: 1 }}
              variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
