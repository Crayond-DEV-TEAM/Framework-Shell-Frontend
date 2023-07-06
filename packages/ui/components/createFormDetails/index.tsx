import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import { DialogDrawer } from '@atoms/dialogDrawer';

import { createFormDetailsStyle } from './style';
import { ImageUpload } from '@atoms/imageUpload';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CustomerCardComponent } from '@atoms/customerCardComponent';

export interface CreateFormDetailsProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: any;
  createEditCustomer?: any;
  formErrors: any;
}

export const CreateFormDetails = (props: CreateFormDetailsProps): JSX.Element => {
  const { className = '', sx = {}, handleChange, createEditCustomer, formErrors, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...createFormDetailsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={createFormDetailsStyle.inputGroupSx}>
            <Label sx={createFormDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
              Customer Name
            </Label>
            <Input
              size="small"
              placeholder="Customer Name"
              value={createEditCustomer?.name}
              id="name"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('name', e?.target?.value)
              }
              textFieldStyle={createFormDetailsStyle.inputSx}
              isError={Boolean(formErrors.name)}
              errorMessage={formErrors.name}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={createFormDetailsStyle.inputGroupSx}>
            <Label sx={createFormDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
              Customer Mail Id
            </Label>
            <Input
              size="small"
              placeholder="Enter Email"
              value={createEditCustomer?.email_id}
              id="email_id"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('email_id', e?.target?.value)
              }
              textFieldStyle={createFormDetailsStyle.inputSx}
              isError={Boolean(formErrors.email_id)}
              errorMessage={formErrors.email_id}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ margin: '16px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={createFormDetailsStyle.inputGroupSx}>
            <Label sx={createFormDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
              Mobile number
            </Label>
            <Input
              size="small"
              placeholder="Enter Mobile number"
              value={createEditCustomer?.contact_number}
              id="contact_number"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('contact_number', e?.target?.value)
              }
              textFieldStyle={createFormDetailsStyle.inputSx}
              isError={Boolean(formErrors.contact_number)}
              errorMessage={formErrors.contact_number}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={createFormDetailsStyle.inputGroupSx}>
            <Label sx={createFormDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
              Company Name
            </Label>
            <Input
              size="small"
              placeholder="Enter Company Name"
              value={createEditCustomer?.company_name}
              id="company_name"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleChange('company_name', e?.target?.value)
              }
              textFieldStyle={createFormDetailsStyle.inputSx}
              isError={Boolean(formErrors.company_name)}
              errorMessage={formErrors.company_name}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
