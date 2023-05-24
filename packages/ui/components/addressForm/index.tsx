import type { SxProps, Theme } from '@mui/material';
import { Box, Grid } from '@mui/material';

import { addressFormStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { ImageUpload } from '@atoms/imageUpload';
import { CustomDropdown } from '@atoms/customDropdown';

export interface AddressFormProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AddressForm = (props: AddressFormProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const handleChange = (x: any, y: any) => {};
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

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
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Address Line
            </Label>
            <Input
              size="small"
              placeholder="Address Line"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              City
            </Label>
            <Input
              size="small"
              placeholder="City"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              State
            </Label>
            <Input
              size="small"
              placeholder="State"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Country
            </Label>
            <CustomDropdown placeholder={'Select Country'} permissionList={options} />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box sx={addressFormStyle.inputGroupSx}>
            <Label sx={addressFormStyle.labelSx} htmlFor="addTitle" isRequired>
              Pincode
            </Label>
            <Input
              size="small"
              placeholder="Pincode"
              // value={groupState?.title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('title', e?.target?.value)
              }
              textFieldStyle={addressFormStyle.inputSx}
              // isError={groupState?.error?.addTitle ? true : false}
              // errorMessage={groupState?.error?.addTitle ?? ''}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
