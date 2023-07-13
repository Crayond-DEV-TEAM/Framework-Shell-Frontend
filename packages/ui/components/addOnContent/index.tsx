import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addOnContentStyle } from './style';
import { CustomDropdown } from '@atoms/customDropdown';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { useEffect, useState } from 'react';
import { AnyCnameRecord } from 'dns';
export interface AddOnContentProps {
  className?: string;
  sx?: SxProps<Theme>;
  options?: any;
  handleAddEditStateChange?: any;
  createEditAddOns?: any;
  formErrors?: any;
}

export const AddOnContent = (props: AddOnContentProps): JSX.Element => {
  const { className = '', sx = {}, options, createEditAddOns, formErrors, handleAddEditStateChange, ...rest } = props;
  const [featuesList, setFeatureList] = useState([]);

  const handleSetupFunc = (value: any) => {
    console.log(value, 'featureGroup');
    handleAddEditStateChange('featuregroup', value);
    const featureDetails = value.featureDetails;
    setFeatureList(featureDetails);
    const currentFeature = createEditAddOns?.features;
    if (currentFeature?.id) {
      const isMatch = featureDetails?.filter((item: any) => item?.id === currentFeature?.id);
      if (!isMatch?.length) handleAddEditStateChange('features', null);
    }
    // setFeatureList(featureDetails);
  };
  console.log(featuesList, 'featuesList');

  useEffect(() => {
    const deMart = createEditAddOns?.featuregroup?.feature_group_mapings?.map((x) => x?.feature);
    setFeatureList(deMart);
  }, [createEditAddOns.id]);

  const foundFeature = featuesList?.some((item) => item.name === createEditAddOns.features?.name);

  // objectArray.find((item) => item.name === billtype?.name);

  console.log(foundFeature, 'foundFeature');

  console.log(foundFeature ? createEditAddOns.features : null, 'createEditAddOns.features');

  return (
    <Box
      sx={[
        {
          ...addOnContentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        <Box sx={addOnContentStyle.inputGroupSx}>
          <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
            Add-on name
          </Label>
          <Input
            size="small"
            placeholder=" Add-on name"
            required
            value={createEditAddOns?.name}
            textFieldStyle={addOnContentStyle.inputSx}
            id="name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleAddEditStateChange('name', e.target.value)
            }
            isError={Boolean(formErrors.name)}
            errorMessage={formErrors.name}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={addOnContentStyle.inputGroupSx}>
          <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
            Description
          </Label>
          <Input
            required
            value={createEditAddOns?.description}
            textFieldStyle={addOnContentStyle.inputSx}
            id="description"
            rows={3}
            rowsMax={6}
            isMulti={true}
            placeholder="Description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleAddEditStateChange('description', e.target.value)
            }
            isError={Boolean(formErrors.description)}
            errorMessage={formErrors.description}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={addOnContentStyle.inputGroupSx}>
          <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
            Choose feature group
          </Label>
          <CutstomizedAutocomplete
            placeholder="Silver"
            permissionList={options}
            onChange={(value) => {
              handleSetupFunc(value);
            }}
            value={
              createEditAddOns.featuregroup && Object.keys(createEditAddOns.featuregroup).length > 0
                ? createEditAddOns.featuregroup
                : null
            }
            isError={Boolean(formErrors.featuregroup)}
            errorMessage={formErrors.featuregroup}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={addOnContentStyle.inputGroupSx}>
          <Label sx={addOnContentStyle.labelTwoSx} htmlFor="addTitle" isRequired>
            Choose feature
          </Label>
          <CutstomizedAutocomplete
            placeholder={'Silver'}
            permissionList={featuesList}
            onChange={(value) => {
              handleAddEditStateChange('features', value);
            }}
            value={foundFeature ? createEditAddOns.features : null}
            isError={Boolean(formErrors.features)}
            errorMessage={formErrors.features}
          />
        </Box>
      </Box>
    </Box>
  );
};
