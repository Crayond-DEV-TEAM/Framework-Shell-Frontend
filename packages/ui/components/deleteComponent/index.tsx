import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { deleteComponentStyle } from './style';
import { DeleteDailog } from '@atoms/deletedailog';
import { Button } from '@atoms/button';

export interface DeleteComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  openCommand?: any;
  onCancel?: any;
  onDelete?: any;
}

export const DeleteComponent = (props: DeleteComponentProps): JSX.Element => {
  const { className = '', sx = {}, openCommand, onCancel, onDelete, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...deleteComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <DeleteDailog
        isDialogOpened={openCommand}
        Bodycomponent={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this?</Typography>
            <Box sx={deleteComponentStyle.totalFooterSx}>
              <Box sx={deleteComponentStyle.btnSx}>
                <Box sx={deleteComponentStyle.btnBg}>
                  <Button buttonStyle={deleteComponentStyle.cancelbtnText} onClick={onCancel}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={deleteComponentStyle.savebtnBg}>
                  <Button buttonStyle={deleteComponentStyle.savebtnText} onClick={onDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
