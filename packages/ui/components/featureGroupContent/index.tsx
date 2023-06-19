import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography, Checkbox } from '@mui/material';
import { forwardRef, useState, useRef } from 'react';

import { featureGroupContentStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useHover } from 'ahooks';
import { DeleteIcon, EditIcon } from '@atoms/icons';
import CutstomizedAutocompleteStories from '@atoms/cutstomizedAutocomplete/cutstomizedAutocomplete.stories';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { CustomDropdown } from '@atoms/customDropdown';

export interface FeatureGroupContentProps {
  className?: string;
  sx?: SxProps<Theme>;
  options?: any;
  handleAddEditStateChange?: any;
  createEditFeatureGroup?: any;
  formErrors?: any;
}

export const FeatureGroupContent = (props: FeatureGroupContentProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    options,
    handleAddEditStateChange,
    createEditFeatureGroup,
    formErrors,
    ...rest
  } = props;
  const ref = useRef(null);
  const isHovering = useHover(ref);
  // const options = [
  //   { label: 'The Godfather', id: 1 },
  //   { label: 'Pulp Fiction', id: 2 },
  // ];

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
          sm={12}
          md={12}
          lg={12}
          xl={12}
          // sx={{ borderRight: '1px solid #E0E0E0', padding: '24px', height: '415px' }}
        >
          <Box sx={featureGroupContentStyle.inputGroupSx}>
            <Label sx={featureGroupContentStyle.labelSx} htmlFor="addTitle" isRequired>
              Feature group name
            </Label>
            <Input
              size="small"
              placeholder=" Enter name"
              required
              value={createEditFeatureGroup?.name}
              textFieldStyle={featureGroupContentStyle.inputSx}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleAddEditStateChange('name', e.target.value)
              }
              isError={Boolean(formErrors.name)}
              errorMessage={formErrors.name}
            />
          </Box>
          <Box sx={{ m: '16px' }} />
          <Box sx={featureGroupContentStyle.inputGroupSx}>
            <Label sx={featureGroupContentStyle.labelSx} htmlFor="addTitle" isRequired>
              Description
            </Label>
            <Input
              placeholder="Description"
              required
              value={createEditFeatureGroup?.description}
              textFieldStyle={featureGroupContentStyle.inputSx}
              id="description"
              rows={3}
              rowsMax={6}
              isMulti={true}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleAddEditStateChange('description', e.target.value)
              }
              isError={Boolean(formErrors.description)}
              errorMessage={formErrors.description}
            />
          </Box>
          <Box sx={{ m: '16px' }} />
          <Box sx={featureGroupContentStyle.inputGroupSx}>
            <Label sx={featureGroupContentStyle.labelSx} htmlFor="addTitle" isRequired>
              Add Features
            </Label>
            <CustomDropdown
              placeholder="options"
              permissionList={options}
              onChange={(value) => {
                handleAddEditStateChange('features', value);
              }}
              value={createEditFeatureGroup.features?.length > 0 ? createEditFeatureGroup.features : []}
              isError={Boolean(formErrors.features)}
              errorMessage={formErrors.features}
            />
          </Box>
        </Grid>
        {/* <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ padding: '24px', position: 'sticky' }}>
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
        </Grid> */}
      </Grid>
    </Box>
  );
};
