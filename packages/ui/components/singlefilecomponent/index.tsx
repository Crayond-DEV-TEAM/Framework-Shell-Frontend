import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Avatar } from '@mui/material';

import { singleFileComponentStyle } from './style';

export interface SingleFileComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SingleFileComponent = (props: SingleFileComponentProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const singleFileUpload = async (
    file: File,
    enqueueSnackbar: (message: SnackbarMessage, options?: any) => void,
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const allowed_image_size = 5;
        const file_type = file?.type.split('/')?.[0];
        const bytes = file?.size;
        const finalSize = Number((bytes / (1024 * 1024)).toFixed(2));
        if (finalSize <= allowed_image_size) {
          resolve(true);
        } else {
          enqueueSnackbar('Please upload less than 5 MB file', {
            variant: 'error',
          });
          resolve(false);
        }
      } catch (error) {
        enqueueSnackbar('Something Went Wrong', {
          variant: 'error',
        });
        resolve(false);
      }
    });
  };

  const handleChange = async (e: any) => {
    if (e?.target?.files) {
      const res = await singleFileUpload(e.target.files[0], '');
      if (res === true) {
        const formData = new FormData();
        formData.append('files', e?.target?.files[0]);
      }
    }
  };

  return (
    <Box
      sx={[
        {
          ...singleFileComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        <label htmlFor="uplodebtn">
          <Avatar
            variant="circular"
            // sx={{ ...ProfilePictureEditStyle?.avatarInner, ...batchAvatarStyle }}
          >
            {/* {badgeIcon ?? <CameraIcon />} */}
          </Avatar>
        </label>
        <input
          type="file"
          name="img"
          accept="image/*"
          style={{ display: 'none' }}
          id="uplodebtn"
          onChange={(e) => handleChange(e)}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
      </Box>
    </Box>
  );
};
