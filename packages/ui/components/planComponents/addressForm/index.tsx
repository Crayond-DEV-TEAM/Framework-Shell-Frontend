import type { SxProps, Theme } from '@mui/material';
import { Box, Grid } from '@mui/material';

import { addressFormStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { ImageUpload } from '@atoms/imageUpload';
import { CustomDropdown } from '@atoms/customDropdown';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';

export interface AddressFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: any;
  createEditCustomer?: any;
  formErrors: any;
}

export const AddressForm = (props: AddressFormProps): JSX.Element => {
  const { className = '', sx = {}, handleChange, formErrors, createEditCustomer, ...rest } = props;
  const options = [{ name: 'India', id: 1 }];
  const selectedCountry = options.find((country) => country.name === createEditCustomer.country);

  if (!selectedCountry) {
    // Country not found in the list, handle the error accordingly
  } else {
    createEditCustomer.country = selectedCountry;
  }

  console.log(createEditCustomer.country, 'createEditCustomer.country');
  return (
    <Box
      sx={[
        {
          ...addressFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Address Line
            </Label>
            <Input
              size="small"
              placeholder="Address Line"
              value={createEditCustomer?.address_line}
              id="address_line"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('address_line', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              isError={Boolean(formErrors.address_line)}
              errorMessage={formErrors.address_line}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              City
            </Label>
            <Input
              size="small"
              placeholder="city"
              value={createEditCustomer?.city}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('city', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              isError={Boolean(formErrors.city)}
              errorMessage={formErrors.city}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              State
            </Label>
            <Input
              size="small"
              placeholder="State"
              value={createEditCustomer?.state}
              id="state"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('state', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              isError={Boolean(formErrors.state)}
              errorMessage={formErrors.state}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ margin: '16px' }} />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Country
            </Label>
            <CutstomizedAutocomplete
              // value={createEditFeatureGroup.features?.length > 0 ? createEditFeatureGroup.features : []}
              value={createEditCustomer.country ? options?.[0] : null}
              placeholder={'Select Country'}
              permissionList={options}
              onChange={(e: any) => handleChange('country', e)}
              isError={Boolean(formErrors.country)}
              errorMessage={formErrors.country}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Pincode
            </Label>
            <Input
              size="small"
              placeholder="Pincode"
              type="number"
              value={createEditCustomer.pincode}
              inputProps={{
                maxLength: 6,
                minLength: 6,
              }}
              id="pincode"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('pincode', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              isError={Boolean(formErrors.pincode)}
              errorMessage={formErrors.pincode}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
