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
            <Button
              sx={{
                width: 'auto',
                borderRadius: '8px',
                backgroundColor: '#EAEAEA',
                textTransform: 'capitalize',
                mr: 1,
                padding: '4px 12px',
                color: '#000000',
                fontSize: '12px',
                '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              // variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: 'auto',
                borderRadius: '8px',
                backgroundColor: 'primary.main',
                textTransform: 'capitalize',
                padding: '4px 12px',
                fontSize: '12px',
              }}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
