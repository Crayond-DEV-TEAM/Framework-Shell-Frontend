import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography, Checkbox } from '@mui/material';
import { forwardRef, useState, useRef } from 'react';

import { featureGroupContentStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useHover } from 'ahooks';
import { DeleteIcon, EditIcon } from '@atoms/icons';

export interface FeatureGroupContentProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const FeatureGroupContent = (props: FeatureGroupContentProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const ref = useRef(null);
  const isHovering = useHover(ref);

  return (
    <Box
      sx={[
        {
          ...featureGroupContentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container>
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          sx={{ borderRight: '1px solid #E0E0E0', padding: '24px', height: '415px' }}
        >
          <Label sx={featureGroupContentStyle.labelSx} htmlFor="addTitle" isRequired>
            Feature group name
          </Label>
          <Input
            size="small"
            placeholder=" Enter name"
            required
            // value={addOnContentStyle?.title}
            textFieldStyle={featureGroupContentStyle.inputSx}
            id="title"
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            //   handleAddEditStateChange('title', e.target.value)
            // }
            // isError={addEditMessageState?.error?.title ? true : false}
            // errorMessage={addEditMessageState?.error?.title ?? ''}
          />
          <Box sx={{ m: '16px' }} />
          <Label sx={featureGroupContentStyle.labelSx} htmlFor="addTitle" isRequired>
            Description
          </Label>
          <Input
            size="small"
            placeholder=""
            required
            // value={addOnContentStyle?.title}
            textFieldStyle={featureGroupContentStyle.inputBigSx}
            id="title"
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            //   handleAddEditStateChange('title', e.target.value)
            // }
            // isError={addEditMessageState?.error?.title ? true : false}
            // errorMessage={addEditMessageState?.error?.title ?? ''}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ padding: '24px', position: 'sticky' }}>
          <Label sx={featureGroupContentStyle.labeltwoSx} htmlFor="addTitle" isRequired>
            Add new Feature
          </Label>
          <Box sx={featureGroupContentStyle.alignTwo}>
            <Input
              size="small"
              placeholder=" Type here to add"
              required
              // value={addOnContentStyle?.title}
              textFieldStyle={featureGroupContentStyle.inputSx}
              id="title"
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              //   handleAddEditStateChange('title', e.target.value)
              // }
              // isError={addEditMessageState?.error?.title ? true : false}
              // errorMessage={addEditMessageState?.error?.title ?? ''}
            />
            <Checkbox sx={{ ml: '5px' }} />
          </Box>
          <Box sx={{ m: '16px' }} />
          <Box sx={featureGroupContentStyle.align}>
            <Typography sx={{ fontSize: '12px', marginRight: '210px' }}>Features</Typography>
            <Typography sx={featureGroupContentStyle.texttwo}>Check to activate</Typography>
          </Box>
          <Box sx={{ m: '16px' }} />
          <Box ref={ref}>
            {isHovering ? (
              <Box sx={featureGroupContentStyle.alignTwo}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '65%',
                    backgroundColor: ' #F7F7F7',
                    borderRadius: '6px',
                    padding: '10px',
                  }}
                >
                  <Typography sx={featureGroupContentStyle.texttwo}>Create action</Typography>
                  <Box>
                    <EditIcon rootStyle={{ width: '16px', height: '16px' }} />
                    <DeleteIcon rootStyle={{ width: '16px', height: '16px' }} />
                  </Box>
                </Box>
                <Checkbox sx={{ ml: '5px' }} />
              </Box>
            ) : (
              <Box sx={featureGroupContentStyle.alignTwo}>
                <Typography sx={featureGroupContentStyle.text}>Create action</Typography>
                <Checkbox sx={{ ml: '5px' }} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
