import type { SxProps } from '@mui/material';

interface ImageUploadStyleProps {
  [key: string]: SxProps;
}

export const imageUploadStyle: ImageUploadStyleProps = {
  rootSx: {},
  border: {
    border: '1px solid #EAEAEA',
    borderRadius: '50%',
    padding: '19px 25px',
  },
};
