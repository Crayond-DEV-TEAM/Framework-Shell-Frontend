import { DropDown, LanguageCard, ToggleButtons } from '@atoms/index';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { addMessageGroupStyle } from './style';

export interface AddMessageGroupProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AddMessageGroup = forwardRef((props: AddMessageGroupProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...addMessageGroupStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Grid container>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ borderRight: '1px solid #E3E3E3', p: 3 }}>
          <Box sx={addMessageGroupStyle.inputGroupSx}>
            <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
              Title
            </Label>
            <Input
              size="small"
              placeholder="username"
              value="Sign In"
              id="username"
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              //   handleChange('username', e.target.value)
              // }
              // isError={values?.error?.username ? true : false}
              // errorMessage={values?.error?.username ?? ''}
            />
          </Box>
          <Box sx={{ m: 2 }} />
          <Box sx={addMessageGroupStyle.inputGroupSx}>
            <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
              Description
            </Label>
            <Input
              size="small"
              placeholder="Add description"
              //value="Sign In"
              //id="username"
              rowMax={5}
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              //   handleChange('username', e.target.value)
              // }
              // isError={values?.error?.username ? true : false}
              // errorMessage={values?.error?.username ?? ''}
            />
          </Box>
          <Box sx={{ m: 2 }} />
          <Box>
            <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
              Severity
            </Label>
            <ToggleButtons />
          </Box>
          <Box sx={{ m: 2 }} />
          <Box>
            <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
              Message Group
            </Label>
            <Box sx={{ height: '40px', pt: 1 }}>
              <DropDown />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ p: 3 }}>
          <Typography sx={addMessageGroupStyle.labelSx}>
            Please provide message titles in respective language
          </Typography>
          <Box sx={{ m: 2 }} />
          <LanguageCard />
        </Grid>
      </Grid>
    </Box>
  );
});

AddMessageGroup.displayName = 'AddMessageGroup';
