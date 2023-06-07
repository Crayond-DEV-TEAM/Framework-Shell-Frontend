import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerCardComponentStyle } from './style';
import { Button } from '..';

export interface CustomerCardComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  btns?: boolean;
  adminName?: any;
  isEdit?: boolean;
  noBtns?: any;
  title?: string;
  body?: any;
  onSave?: any;
  onEdit?: any;
  adminOnclick?: any;
}

export const CustomerCardComponent = (props: CustomerCardComponentProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    btns = false,
    isEdit = true,
    adminName = false,
    noBtns = false,
    title = 'title',
    body,
    onSave,
    onEdit,
    adminOnclick,
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...customerCardComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        <Box sx={customerCardComponentStyle.header}>
          <Typography sx={customerCardComponentStyle.title}>{title}</Typography>
          {noBtns && (
            <Box>
              {btns === false && (
                <>
                  {adminName === false && (
                    <Button
                      sx={{ width: '72px', height: '28px', textTransform: 'capitalize', fontSize: '12px' }}
                      onClick={onEdit}
                    >
                      Edit
                    </Button>
                  )}
                </>
              )}
              {btns && (
                <Box sx={customerCardComponentStyle.btn}>
                  <Button
                    sx={{ width: '72px', height: '28px', textTransform: 'capitalize', fontSize: '12px' }}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ width: '72px', height: '28px', textTransform: 'capitalize', ml: 1, fontSize: '12px' }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
              {adminName && (
                <Typography sx={customerCardComponentStyle.addAdmin} onClick={adminOnclick}>
                  + Add New Admin
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box sx={customerCardComponentStyle.body}>{body}</Box>
      </Box>
    </Box>
  );
};
