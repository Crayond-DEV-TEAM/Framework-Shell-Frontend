import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { singleFileComponentStyle } from './style';

export interface SingleFileComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: (e: any) => void;
}

export const SingleFileComponent = (props: SingleFileComponentProps): JSX.Element => {
  const { className = '', sx = {}, handleChange = () => false, ...rest } = props;

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
      <Box sx={singleFileComponentStyle?.rootSx}>
        <label htmlFor="uplodebtn">
          <Avatar
            variant="circular"
            sx={singleFileComponentStyle?.eyeSx}
            // sx={{ ...ProfilePictureEditStyle?.avatarInner, ...batchAvatarStyle }}
          >
            <CloudUploadIcon />
          </Avatar>
        </label>
        <input
          type="file"
          name="img"
          accept="image/*"
          style={{ display: 'none' }}
          id="uplodebtn"
          onChange={handleChange}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
      </Box>
    </Box>
  );
};
