import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { createFormStyle } from './style';
import { ImageUpload } from '@atoms/imageUpload';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CustomerCardComponent } from '@atoms/customerCardComponent';

export interface CreateFormProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreateForm = (props: CreateFormProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const handleChange = (x: any, y: any) => {
    console.log('///');
  };

  return (
    <Box
      sx={[
        {
          ...createFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
          <ImageUpload />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={5.25} xl={5.25}>
          <Box sx={createFormStyle.inputGroupSx}>
            <Label sx={createFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Company Name
            </Label>
            <Input
              size="small"
              placeholder="Company Name"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={createFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={5.25} xl={5.25}>
          <Box sx={createFormStyle.inputGroupSx}>
            <Label sx={createFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Company Website
            </Label>
            <Input
              size="small"
              placeholder="Company Website"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={createFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <Box sx={{ border: '1px solid #EAEAEA', mt: 2 }} /> */}
      {/* <Box></Box> */}
    </Box>
  );
};
