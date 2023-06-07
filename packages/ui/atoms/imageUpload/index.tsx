import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Avatar, Grid, IconButton } from '@mui/material';
import { imageUploadStyle } from './style';
import React, { useState } from 'react';
import { UploadButton } from '@atoms/icons';

export interface ImageUploadProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ImageUpload = (props: ImageUploadProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const [selectedFile, setSelectedFile] = useState('initial');

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    // setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    // Perform upload logic here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // You can perform your upload logic here, e.g., send the file to a server
    }
  };

  return (
    <Box
      sx={[
        {
          ...imageUploadStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="upload-input"
          />
          {selectedFile === 'initial' ? (
            <label htmlFor="upload-input">
              <IconButton component="span" sx={{ '&.MuiButtonBase-root.MuiIconButton-root': { p: 0 } }}>
                <Box sx={imageUploadStyle.border}>
                  <UploadButton />
                </Box>
              </IconButton>
            </label>
          ) : (
            <Box sx={{ p: 1 }}>
              <Avatar alt="image" src={selectedFile} sx={{ width: 76, height: 76, border: '1px solid #EAEAEA' }} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
